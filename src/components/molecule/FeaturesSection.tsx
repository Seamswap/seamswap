import React from 'react';

type Props = {};

const FeaturesSection = () => {
  const [currentTab, setCurrentTab] = React.useState('swap');
  const [featureImage, setFeatureImage] = React.useState('/img/swapScreen.png');

	// handle changing feature image on tab change
	React.useEffect(() => {
		switch (currentTab) {
			case 'swap':
				setFeatureImage('/img/swapScreen.png');
				break;
			case 'lessFee':
				setFeatureImage('/img/lessFeeScreen.png');
				break;
			case 'discover':
				setFeatureImage('/img/discoverScreen.png');
				break;
			case 'send':
				setFeatureImage('/img/sendScreen.png');
				break;
			default:
				setFeatureImage('/img/swapScreen.png');
		}
	}, [currentTab]);

  const FeatureItem = ({
    id,
    title,
    description,
    icon,
  }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    id: string;
  }) => {
    return (
      <div
        data-state={currentTab === id}
        onClick={() => setCurrentTab(id)}
        className="item w-full mb-4 last-of-type:mb-0 justify-start items-start gap-5 inline-flex py-3 p-2.5 lg:px-4 rounded-s-xl cursor-pointer
				data-[state=true]:bg-[#00CCB4] data-[state=true]:border-grey-960 data-[state=true]:border-[0.5px]"
      >
        <div className="p-3 bg-grey-960 rounded-[10px]">{icon}</div>

        <div className="">
          <div className="text-2xl font-semibold mb-[2px]">{title}</div>
          <p className="text-sm lg:text-base">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-x-5 gap-y-4">
      <div className="left py-8 pl-5 bg-[#00B8A1] rounded-[20px] relative overflow-hidden">
        <div className="content text-grey-960 z-10 relative">
          {/*  */}
          <FeatureItem
            title="Swap"
            id={'swap'}
            description="Easily swap between ILM positions. Skip the back and forth process of withdrawing and depositing."
            icon={
              <svg
                className="w-[42px]"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34.1664 24.9833L25.8164 33.3499"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.83301 24.9833H34.1663"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.83301 15.0167L14.183 6.65002"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M34.1663 15.0167H5.83301"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          />

          <FeatureItem
            title="Less fee"
            id={'lessFee'}
            description="Get the best rate for swapping your position, also save some transaction fee."
            icon={
              <svg
                className="w-[42px]"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4531 23.883C14.4531 26.033 16.1031 27.7664 18.1531 27.7664H22.3365C24.1198 27.7664 25.5698 26.2497 25.5698 24.383C25.5698 22.3497 24.6865 21.633 23.3698 21.1664L16.6531 18.833C15.3365 18.3664 14.4531 17.6497 14.4531 15.6164C14.4531 13.7497 15.9031 12.233 17.6865 12.233H21.8698C23.9198 12.233 25.5698 13.9664 25.5698 16.1164"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 10V30"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.9997 36.6667C29.2044 36.6667 36.6663 29.2048 36.6663 20C36.6663 10.7953 29.2044 3.33337 19.9997 3.33337C10.7949 3.33337 3.33301 10.7953 3.33301 20C3.33301 29.2048 10.7949 36.6667 19.9997 36.6667Z"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          />

          <FeatureItem
            title="Discover"
            id={'discover'}
            description="Explore the integrated liquidity marketplace, learn, and earn from participation."
            icon={
              <svg
                className="w-[42px]"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9997 36.6667C29.1663 36.6667 36.6663 29.1667 36.6663 20C36.6663 10.8334 29.1663 3.33337 19.9997 3.33337C10.833 3.33337 3.33301 10.8334 3.33301 20C3.33301 29.1667 10.833 36.6667 19.9997 36.6667Z"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-miterlimit="10"
                />
                <path
                  d="M22.4997 13.3334C17.4497 13.3334 13.333 17.4667 13.333 22.5C13.333 24.7834 15.1997 26.6667 17.4997 26.6667C22.533 26.6667 26.6663 22.5334 26.6663 17.5C26.6663 15.2167 24.783 13.3334 22.4997 13.3334Z"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          />

          <FeatureItem
            title="Send"
            id={'send'}
            description="Transfer your positions to another when swapping."
            icon={
              <svg
                className="w-[42px]"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3338 10.5333L26.4838 5.81668C32.8338 3.70001 36.2838 7.16668 34.1838 13.5167L29.4671 27.6667C26.3005 37.1833 21.1005 37.1833 17.9338 27.6667L16.5338 23.4667L12.3338 22.0667C2.81712 18.9 2.81712 13.7167 12.3338 10.5333Z"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.8496 22.7501L22.8163 16.7667"
                  stroke="#CCFFF9"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
          />

          {/*  */}
        </div>
      </div>

      <div className="right rounded-[20px] border-primary overflow-hidden p-2 lg:p-6 grid items-center">
        <img src={featureImage} className="w-full" alt="featureScreen" />
      </div>
    </div>
  );
};

export default FeaturesSection;