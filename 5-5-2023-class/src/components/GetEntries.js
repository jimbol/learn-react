import useEntries from "../hooks/useEntries";
import React from "react";

const GetEntries = ({ children }) => {
  const {
    loading,
    toggleOpen,
    addEntry,
    entries,
  } = useEntries();

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        loading,
        toggleOpen,
        addEntry,
        entries,
      });
    }
    return child;
  });

  return (<>{childrenWithProps}</>);
};

export default GetEntries;
