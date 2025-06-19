import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {index < items.length - 1 ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
