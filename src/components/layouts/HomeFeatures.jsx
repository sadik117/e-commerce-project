import { Truck, RefreshCcw, CreditCard, Shirt, Leaf } from "lucide-react";

const HomeFeatures = () => {
  const features = [
    {
      icon: <Truck className="w-10 h-10 text-[#5b0e0e]" />,
      title: "FREE DELIVERY",
      desc: "Free delivery over 5000 BDT shopping",
    },
    {
      icon: <RefreshCcw className="w-10 h-10 text-[#5b0e0e]" />,
      title: "EASY RETURNS",
      desc: "Easily return in easy way",
    },
    {
      icon: <CreditCard className="w-10 h-10 text-[#5b0e0e]" />,
      title: "SECURE PAYMENT",
      desc: "Online payment cards",
    },
    {
      icon: <Shirt className="w-10 h-10 text-[#5b0e0e]" />,
      title: "OVER THOUSANDS STYLES",
      desc: "Trendy fashion collection",
    },
    {
      icon: <Leaf className="w-10 h-10 text-[#5b0e0e]" />,
      title: "ECO-FRIENDLY",
      desc: "Engaging your feed",
    },
  ];

  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-3"
            >
              <div>{item.icon}</div>
              <h3 className="text-lg font-bold text-[#5b0e0e]">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
