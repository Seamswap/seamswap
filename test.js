const { ethers } = require('ethers');
const abi = [{ 'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor' }, {
  'inputs': [],
  'name': 'AccessControlBadConfirmation',
  'type': 'error',
}, {
  'inputs': [{ 'internalType': 'address', 'name': 'account', 'type': 'address' }, {
    'internalType': 'bytes32',
    'name': 'neededRole',
    'type': 'bytes32',
  }], 'name': 'AccessControlUnauthorizedAccount', 'type': 'error',
}, {
  'inputs': [{ 'internalType': 'address', 'name': 'target', 'type': 'address' }],
  'name': 'AddressEmptyCode',
  'type': 'error',
}, {
  'inputs': [{ 'internalType': 'address', 'name': 'implementation', 'type': 'address' }],
  'name': 'ERC1967InvalidImplementation',
  'type': 'error',
}, { 'inputs': [], 'name': 'ERC1967NonPayable', 'type': 'error' }, {
  'inputs': [],
  'name': 'FailedInnerCall',
  'type': 'error',
}, { 'inputs': [], 'name': 'InvalidAddress', 'type': 'error' }, {
  'inputs': [],
  'name': 'InvalidInitialization',
  'type': 'error',
}, { 'inputs': [], 'name': 'MathOverflowedMulDiv', 'type': 'error' }, {
  'inputs': [],
  'name': 'MaxSlippageExceeded',
  'type': 'error',
}, { 'inputs': [], 'name': 'NotInitializing', 'type': 'error' }, {
  'inputs': [],
  'name': 'NotStrategy',
  'type': 'error',
}, { 'inputs': [], 'name': 'SlippageOutsideRange', 'type': 'error' }, {
  'inputs': [],
  'name': 'USDValueOutsideRange',
  'type': 'error',
}, { 'inputs': [], 'name': 'UUPSUnauthorizedCallContext', 'type': 'error' }, {
  'inputs': [{
    'internalType': 'bytes32',
    'name': 'slot',
    'type': 'bytes32',
  }], 'name': 'UUPSUnsupportedProxiableUUID', 'type': 'error',
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': false, 'internalType': 'uint64', 'name': 'version', 'type': 'uint64' }],
  'name': 'Initialized',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': false, 'internalType': 'uint256', 'name': 'offsetDeviationUSD', 'type': 'uint256' }],
  'name': 'OffsetDeviationSet',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'contract IERC20',
    'name': 'from',
    'type': 'address',
  }, { 'indexed': true, 'internalType': 'contract IERC20', 'name': 'to', 'type': 'address' }, {
    'indexed': false,
    'internalType': 'uint256',
    'name': 'offsetUSD',
    'type': 'uint256',
  }],
  'name': 'OffsetFactorSet',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': false, 'internalType': 'contract IPriceOracleGetter', 'name': 'oracle', 'type': 'address' }],
  'name': 'OracleSet',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'bytes32', 'name': 'role', 'type': 'bytes32' }, {
    'indexed': true,
    'internalType': 'bytes32',
    'name': 'previousAdminRole',
    'type': 'bytes32',
  }, { 'indexed': true, 'internalType': 'bytes32', 'name': 'newAdminRole', 'type': 'bytes32' }],
  'name': 'RoleAdminChanged',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'bytes32', 'name': 'role', 'type': 'bytes32' }, {
    'indexed': true,
    'internalType': 'address',
    'name': 'account',
    'type': 'address',
  }, { 'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address' }],
  'name': 'RoleGranted',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'bytes32', 'name': 'role', 'type': 'bytes32' }, {
    'indexed': true,
    'internalType': 'address',
    'name': 'account',
    'type': 'address',
  }, { 'indexed': true, 'internalType': 'address', 'name': 'sender', 'type': 'address' }],
  'name': 'RoleRevoked',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'contract IERC20',
    'name': 'from',
    'type': 'address',
  }, { 'indexed': true, 'internalType': 'contract IERC20', 'name': 'to', 'type': 'address' }],
  'name': 'RouteRemoved',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'contract IERC20',
    'name': 'from',
    'type': 'address',
  }, {
    'indexed': true,
    'internalType': 'contract IERC20',
    'name': 'to',
    'type': 'address',
  }, {
    'components': [{
      'internalType': 'contract IERC20',
      'name': 'from',
      'type': 'address',
    }, {
      'internalType': 'contract IERC20',
      'name': 'to',
      'type': 'address',
    }, { 'internalType': 'contract ISwapAdapter', 'name': 'adapter', 'type': 'address' }],
    'indexed': false,
    'internalType': 'struct Step[]',
    'name': 'steps',
    'type': 'tuple[]',
  }],
  'name': 'RouteSet',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': false, 'internalType': 'address', 'name': 'strategy', 'type': 'address' }],
  'name': 'StrategyAdded',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': false, 'internalType': 'address', 'name': 'strategy', 'type': 'address' }],
  'name': 'StrategyRemoved',
  'type': 'event',
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': 'implementation', 'type': 'address' }],
  'name': 'Upgraded',
  'type': 'event',
}, {
  'inputs': [],
  'name': 'DEFAULT_ADMIN_ROLE',
  'outputs': [{ 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [],
  'name': 'MANAGER_ROLE',
  'outputs': [{ 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [],
  'name': 'STRATEGY_ROLE',
  'outputs': [{ 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{
    'internalType': 'address',
    'name': 'initialAdmin',
    'type': 'address',
  }, { 'internalType': 'contract IPriceOracleGetter', 'name': 'oracle', 'type': 'address' }],
  'name': 'Swapper_init',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'inputs': [],
  'name': 'UPGRADER_ROLE',
  'outputs': [{ 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [],
  'name': 'UPGRADE_INTERFACE_VERSION',
  'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [],
  'name': 'getOracle',
  'outputs': [{ 'internalType': 'contract IPriceOracleGetter', 'name': 'oracle', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{ 'internalType': 'bytes32', 'name': 'role', 'type': 'bytes32' }],
  'name': 'getRoleAdmin',
  'outputs': [{ 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{
    'internalType': 'contract IERC20',
    'name': 'from',
    'type': 'address',
  }, { 'internalType': 'contract IERC20', 'name': 'to', 'type': 'address' }],
  'name': 'getRoute',
  'outputs': [{
    'components': [{
      'internalType': 'contract IERC20',
      'name': 'from',
      'type': 'address',
    }, {
      'internalType': 'contract IERC20',
      'name': 'to',
      'type': 'address',
    }, { 'internalType': 'contract ISwapAdapter', 'name': 'adapter', 'type': 'address' }],
    'internalType': 'struct Step[]',
    'name': 'steps',
    'type': 'tuple[]',
  }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{ 'internalType': 'bytes32', 'name': 'role', 'type': 'bytes32' }, {
    'internalType': 'address',
    'name': 'account',
    'type': 'address',
  }], 'name': 'grantRole', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function',
}, {
  'inputs': [{ 'internalType': 'bytes32', 'name': 'role', 'type': 'bytes32' }, {
    'internalType': 'address',
    'name': 'account',
    'type': 'address',
  }],
  'name': 'hasRole',
  'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{
    'internalType': 'contract IERC20',
    'name': 'from',
    'type': 'address',
  }, { 'internalType': 'contract IERC20', 'name': 'to', 'type': 'address' }],
  'name': 'offsetFactor',
  'outputs': [{ 'internalType': 'uint256', 'name': 'offsetUSD', 'type': 'uint256' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [],
  'name': 'proxiableUUID',
  'outputs': [{ 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{
    'internalType': 'contract IERC20',
    'name': 'from',
    'type': 'address',
  }, { 'internalType': 'contract IERC20', 'name': 'to', 'type': 'address' }],
  'name': 'removeRoute',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'inputs': [{ 'internalType': 'bytes32', 'name': 'role', 'type': 'bytes32' }, {
    'internalType': 'address',
    'name': 'callerConfirmation',
    'type': 'address',
  }], 'name': 'renounceRole', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function',
}, {
  'inputs': [{ 'internalType': 'bytes32', 'name': 'role', 'type': 'bytes32' }, {
    'internalType': 'address',
    'name': 'account',
    'type': 'address',
  }], 'name': 'revokeRole', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function',
}, {
  'inputs': [{
    'internalType': 'contract IERC20',
    'name': 'from',
    'type': 'address',
  }, { 'internalType': 'contract IERC20', 'name': 'to', 'type': 'address' }, {
    'internalType': 'uint256',
    'name': 'offsetUSD',
    'type': 'uint256',
  }], 'name': 'setOffsetFactor', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function',
}, {
  'inputs': [{ 'internalType': 'contract IPriceOracleGetter', 'name': 'oracle', 'type': 'address' }],
  'name': 'setOracle',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'inputs': [{
    'internalType': 'contract IERC20',
    'name': 'from',
    'type': 'address',
  }, {
    'internalType': 'contract IERC20',
    'name': 'to',
    'type': 'address',
  }, {
    'components': [{
      'internalType': 'contract IERC20',
      'name': 'from',
      'type': 'address',
    }, {
      'internalType': 'contract IERC20',
      'name': 'to',
      'type': 'address',
    }, { 'internalType': 'contract ISwapAdapter', 'name': 'adapter', 'type': 'address' }],
    'internalType': 'struct Step[]',
    'name': 'steps',
    'type': 'tuple[]',
  }], 'name': 'setRoute', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function',
}, {
  'inputs': [{ 'internalType': 'bytes4', 'name': 'interfaceId', 'type': 'bytes4' }],
  'name': 'supportsInterface',
  'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
  'stateMutability': 'view',
  'type': 'function',
}, {
  'inputs': [{
    'internalType': 'contract IERC20',
    'name': 'from',
    'type': 'address',
  }, { 'internalType': 'contract IERC20', 'name': 'to', 'type': 'address' }, {
    'internalType': 'uint256',
    'name': 'fromAmount',
    'type': 'uint256',
  }, { 'internalType': 'address payable', 'name': 'beneficiary', 'type': 'address' }, {
    'internalType': 'uint256',
    'name': 'maxSlippage',
    'type': 'uint256',
  }],
  'name': 'swap',
  'outputs': [{ 'internalType': 'uint256', 'name': 'toAmount', 'type': 'uint256' }],
  'stateMutability': 'nonpayable',
  'type': 'function',
}, {
  'inputs': [{
    'internalType': 'address',
    'name': 'newImplementation',
    'type': 'address',
  }, { 'internalType': 'bytes', 'name': 'data', 'type': 'bytes' }],
  'name': 'upgradeToAndCall',
  'outputs': [],
  'stateMutability': 'payable',
  'type': 'function',
}];
const provider = new ethers.JsonRpcProvider('https://mainnet.base.org');
const Router = new ethers.Contract('0x08561d280654790861591fFAf68ed193AdDC479D', abi, provider);
console.log(Router.Swapper_init(
  '0xbfaaDee0923C44195be8880E7aD0Aa926Fd9D065',
  '0x0000000000000000000000000000000000000000'
  // '0x258730e23cF2f25887Cb962d32Bd10b878ea8a4e',
  // '0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4'
).then(console.log));