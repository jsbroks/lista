import React from "react";

export const Show = ({ condition, children }) => {
  return <div style={condition ? {} : { display: "none" }}>{children}</div>;
};

export const If = ({ condition, children, isTrue, isFalse }) => {
  if (children) {
    return condition ? children : null;
  }
  return condition ? isTrue : isFalse;
};
