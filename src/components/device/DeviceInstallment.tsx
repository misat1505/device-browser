type DeviceInstallmentProps = {
  amount: number;
  months: number;
};

export function DeviceInstallment({ amount, months }: DeviceInstallmentProps) {
  return (
    <p
      className="mt-3.5 text-[#555555]"
      style={{
        fontFamily: "SamsungOne",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "18px",
        fontSize: "16px",
      }}
    >
      {amount.toFixed(2).replace(".", ",")} zł x {months} rat
    </p>
  );
}
