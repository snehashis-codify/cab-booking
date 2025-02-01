import { Helmet } from "react-helmet";

function MetaDataProvider({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
  );
}

export default MetaDataProvider;
