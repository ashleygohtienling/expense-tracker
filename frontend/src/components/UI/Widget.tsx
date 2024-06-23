import React, { FC } from "react";
import s from "./Widget.module.css";

interface Widget {
  title?: string;
  children: React.ReactNode;
}

export const Widget: FC<Widget> = ({ title = null, children }) => {
  return (
    <section className={s.widget}>
      {title && <div className={s.title}>{title}</div>}
      <div className={`${s.widgetAuth} ${s.widgetP}`}>{children}</div>
    </section>
  );
};
