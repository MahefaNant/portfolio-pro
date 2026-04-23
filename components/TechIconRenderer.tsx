/* eslint-disable @typescript-eslint/no-explicit-any */
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

export function TechIconRenderer({
  name,
  className = "h-5 w-5",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const allIcons: Record<string, any> = { ...SiIcons, ...FaIcons };

  if (allIcons[name]) {
    const Icon = allIcons[name];
    return <Icon className={className} style={style} />;
  }

  // Fallback avec initiales
  const initials = name
    .replace(/^(Si|Fa)/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className={`${className} flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg text-white font-bold`}
      style={{ fontSize: "60%" }}
      title={name}
    >
      {initials}
    </div>
  );
}
