const NewsCard = ({ newsDetails }) => {
  let imgSrc = "/images/newsdummy.jpeg";
  const { title, id, image, section, subtitle } = newsDetails;
  if (image) {
    imgSrc = image;
  }
  let subtitleFormatted =
    subtitle.length > 60 ? subtitle.slice(0, 60) + "...." : subtitle;

  return (
    <>
      <div href={`/news/${id}`}>
        <div className="mt-5 text-left rounded-md bg-white cursor-pointer shadow-lg group card-zoom hover:shadow-2xl">
          <p className="text-left text-md uppercase text-darkred px-4 pt-4 font-bold ">
            {section}
          </p>
          <img src={imgSrc} className="p-4 h-52 newscardimg" />
          <h2 className="text-left roboto-text text-md uppercase text-lightdark px-4 pb-2 leading-6">
            {title}
          </h2>
          <p className="text-left px-4 mb-5 text-xs text-slate-600">
            {subtitleFormatted}
          </p>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
