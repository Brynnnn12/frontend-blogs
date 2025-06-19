export default function Carousel({ items = [], containerClassName = "" }) {
  return (
    <div className={`carousel w-full ${containerClassName}`}>
      {items.map((item, index) => {
        const prevIndex = index === 0 ? items.length - 1 : index - 1;
        const nextIndex = index === items.length - 1 ? 0 : index + 1;

        return (
          <div
            key={index}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
          >
            {typeof item === "string" ? (
              // Jika item adalah string URL
              <img src={item} className="w-full" alt={`Slide ${index + 1}`} />
            ) : (
              // Jika item adalah JSX element
              item
            )}

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href={`#slide${prevIndex + 1}`} className="btn btn-circle">
                ❮
              </a>
              <a href={`#slide${nextIndex + 1}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
