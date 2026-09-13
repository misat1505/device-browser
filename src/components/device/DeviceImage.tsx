type DeviceImageProps = {
  src: string;
  alt: string;
};

export function DeviceImage({ src, alt }: DeviceImageProps) {
  return (
    <div className="h-50">
      <img className="mx-auto h-50" src={src} alt={alt} />
    </div>
  );
}
