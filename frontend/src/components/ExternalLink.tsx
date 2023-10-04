type Props = {
  title: string;
  description: string;
  href: string;
};

export default function ExternalLink({description, href, title}: Props) {
  return (
    <a
      className="inline-block p-8 transition-colors border border-gray-700 rounded-md hover:border-gray-400"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <p className="text-xl font-semibold text-gray-800">
        {title} <span className="inline-block ml-2">→</span>
      </p>
      <p className="mt-2 max-w-[250px] text-gray-600">{description}</p>
    </a>
  );
}
