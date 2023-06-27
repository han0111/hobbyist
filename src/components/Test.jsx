import { useTranslation } from "react-i18next";

const Test = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t("testText")}</h2>
    </>
  );
};

export default Test;
