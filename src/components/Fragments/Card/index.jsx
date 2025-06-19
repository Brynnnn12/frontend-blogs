import Button from "../../Elements/Button";

export default function Card({ title, image, description }) {
  return (
    <div className="card w-full max-w-md bg-white shadow-sm">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body bg-base-100">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Button variant="primary" size="md">
            Beli Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
}
