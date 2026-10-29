import s from "./ColumnLines.module.css";
/** Cinco líneas verticales fijas que dan estructura al fondo. */
export function ColumnLines() { return <div className={s.cols} aria-hidden="true"><span /><span /><span /><span /><span /></div>; }
