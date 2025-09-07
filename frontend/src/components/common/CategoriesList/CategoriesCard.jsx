import React from "react";

function CategoriesCard({ image, name }) {
  return (
    <div className="group flex flex-col gap-2 overflow-hidden cursor-pointer min-w-[200px] md:min-w-0">
      <div>
        <img
          src={image}
          alt={name}
          loading="lazy"
          height={320}
          className="object-cover rounded-2xl group-hover:border-[0.5px] group-hover:border-bgprimary transition-all h-[200px] md:h-[320px] w-full"
        />
      </div>
      <p className="my-2 font-normal text-lg md:text-xl group-hover:text-bgsecondary transition-all text-center">
        {name}
      </p>
    </div>
  );
}

export default CategoriesCard;
