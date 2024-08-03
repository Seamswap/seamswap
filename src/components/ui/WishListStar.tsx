import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { api } from '@src/utils/trpc';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Explorer } from '@src/pages/explorer';
import { LoginProviderContext } from '@components/providers/LoginProvider';

const WishListStar = (data: Explorer) => {
  const [watchlisted, setWatchlisted] = useState(false);
  const { mutate: add, isPending: isAdding } = api.wishlist.createWishList.useMutation();
  const { mutate: remove, isPending: isRemoving } = api.wishlist.deleteWishList.useMutation();
  const { openConnectModal } = useConnectModal();
  const { account } = React.useContext(LoginProviderContext);
  const { data: waitlistData, isLoading } = api.wishlist.getWishListByAsset.useQuery({ asset_address: data.address, wallet_address: account?.address as string },{
    enabled: !!account?.address,
  });
  const handleWishListAdd = () => {
    if (!account?.address) {
      openConnectModal?.()
      return
    }
    if (!watchlisted) {
      add({
        asset_address: data.address,
        wallet_address: account?.address as string,
      });
      setWatchlisted(true);
    } else {
      remove({
        asset_address: data.address,
        wallet_address: account?.address as string,
      });

      setWatchlisted(false);
    }
  }
  useEffect(() => {
    if (waitlistData) {
      setWatchlisted(true);
    }
  }, [waitlistData])
  return (
    <div
      className="flex justify-center cursor-pointer"
      onClick={handleWishListAdd}
    >
      {(isAdding || isRemoving || isLoading) ? <span>Loading...</span> : watchlisted ? (
        <Star className="text-[#FFBB0B]" fill="#FFBB0B" />
      ) : (
        <Star className="text-grey-700" />
      )}
    </div>
  );
};

export default WishListStar;