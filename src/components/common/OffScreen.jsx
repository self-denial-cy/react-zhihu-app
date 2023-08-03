import { Suspense, useRef } from 'react';

// 适用于局部缓存的场景【不涉及到路由跳转】，需要注意实际上使用 display 属性控制显示隐藏，组件并未卸载，所以与 TransitionGroup 配合不佳
export function OffScreen(props) {
  const { mode, children } = props; // mode: visible | hidden
  return (
    <Suspense>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
}

function Repeater(props) {
  const { mode, children } = props;
  const resolveRef = useRef();
  if (resolveRef.current) {
    resolveRef.current();
    resolveRef.current = void 0;
  }
  if (mode === 'hidden') {
    throw new Promise((resolve) => (resolveRef.current = resolve));
  }
  return <>{children}</>;
}
