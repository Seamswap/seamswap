import { Address, decodeEventLog, pad, parseEther } from 'viem';
import { createApproveTx, createDepositTx, createWithdrawTx } from './bundlesHelpers';
import { depositEventAbi } from '@src/abis/DepositEvent';
import { buildSuccessfulFetch, FetchData } from '@src/lib/types/fetch';
import { withdrawEventAbi } from '@src/abis/WithdrawEvent';


export interface PreviewDeposit {
  sharesToReceive: bigint;
}

export interface PreviewWithdraw {
  assetsToReceive: bigint;
}

const alchemySimulationRpc = 'https://base.gateway.tenderly.co/2DwyATJ0tSGlGhvjccV3Dz';

async function simulateBundle(functionCalls: any) {
  const res = await fetch(alchemySimulationRpc, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-Access-Key': 'w90OvJZiIUtA1O08wTccJhaw6cM4jFEF',
    },
    body: JSON.stringify({
      'id': 0,
      'jsonrpc': '2.0',
      'method': 'tenderly_simulateBundle',
      'params': [
        functionCalls,
        'latest',
      ],
    }),
  });

  if (!res.ok) {
    // eslint-disable-next-line no-console
    console.error('Failed to simulate transactions');
    throw new Error(`Failed to simulate transactions, error: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}


export async function simulateDeposit(
  account: Address,
  strategy: Address,
  underlyingAsset: Address,
  amount: string,
): Promise<PreviewDeposit> {
  if (parseEther(amount) === 0n) throw new Error('Invalid amount');

  const { result } = await simulateBundle([
    createApproveTx(account, underlyingAsset, strategy, amount),
    createDepositTx(account, strategy, amount),
  ]);

  if (!result || !result[0].logs) throw new Error('Failed to simulate transactions');

  const { logs } = result[1];
  // Deposit event is the last event
  const depositEvent = (logs ? logs[logs.length - 1] : undefined)?.raw;
  if (!depositEvent) throw new Error('Failed to find deposit event');
  const decodedDepositEvent = decodeEventLog({
    abi: depositEventAbi,
    data: depositEvent.data,
    topics: [depositEvent.topics[0], pad(depositEvent.topics[1]), pad(depositEvent.topics[2])] as any,
  });

  const sharesToReceive = decodedDepositEvent.args.shares;
  return { sharesToReceive };
}

export async function simulateWithdraw(
  account: Address,
  strategy: Address,
  amount: string,
): Promise<FetchData<PreviewWithdraw>> {
  if (parseEther(amount) === 0n) {
    return buildSuccessfulFetch({ assetsToReceive: 0n });
  }

  const { result } = await simulateBundle([createWithdrawTx(account, strategy, amount)]);
  if (!result || !result[0].logs) throw new Error('Failed to simulate transactions');

  const { logs } = result[0];
  // Withdraw event is the last event
  const withdrawEvent = (logs ? logs[logs.length - 1] : undefined)?.raw;
  console.log({ withdrawEvent })

  if (!withdrawEvent) throw new Error('Failed to find withdraw event');
  const decodedWithdrawEvent = decodeEventLog({
    abi: withdrawEventAbi,
    data: withdrawEvent.data,
    topics: [
      withdrawEvent.topics[0],
      pad(withdrawEvent.topics[1]),
      pad(withdrawEvent.topics[2]),
      pad(withdrawEvent.topics[3]),
    ] as any,
  });

  return buildSuccessfulFetch({ assetsToReceive: decodedWithdrawEvent.args.assets });
}
