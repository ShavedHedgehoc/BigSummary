export default function withVisible(wrappedComponent: React.ComponentType) {
  function Visible({ visible, ...otherProps }: { visible: boolean }) {
    if (!visible) return null;
    const WrappedComponent = wrappedComponent;
    return <WrappedComponent {...otherProps} />;
  }
  return Visible;
}
