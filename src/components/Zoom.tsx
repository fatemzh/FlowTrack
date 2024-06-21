import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ZoomProps {
    children: React.ReactNode

}
const Zoom: React.FC<ZoomProps> = ({children}) => {
  return (
    <TransformWrapper>
      <TransformComponent>
        {children}
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Zoom;