export default function createHOC(hocClassFactory, prefix = 'with') {
  return (options) => {
    return WrappedComponent => {
      const componentName = WrappedComponent.displayName || WrappedComponent.name;
      const hocClass = hocClassFactory(options);
      hocClass.displayName = `${prefix}${hocClass.name}(${componentName})`;
      hocClass.WrappedComponent = WrappedComponent;

      return hocClass;
    };
  };
}
