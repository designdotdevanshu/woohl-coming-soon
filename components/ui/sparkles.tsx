interface SparklesCoreProps {
  id: string;
  background: string;
  minSize: number;
  maxSize: number;
  particleDensity: number;
  className: string;
  particleColor: string;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({ className }) => {
  return <div className={className} />;
};
