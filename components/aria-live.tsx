type AriaLiveProps = {
  validMsg: string;
  invalidMsg: string;
  isValid: boolean;
  variant?: "assertive" | "polite";
};

const AriaLive: React.FC<AriaLiveProps> = ({
  validMsg,
  invalidMsg,
  isValid,
  variant = "assertive",
}) => {
  return (
    <>
      {!isValid ? (
        <p className="visually-hidden" aria-live={variant}>
          {invalidMsg}
        </p>
      ) : (
        <p className="visually-hidden" aria-live={variant}>
         {validMsg}
        </p>
      )}
    </>
  );
};

export default AriaLive;
