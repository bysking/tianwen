import {
  ACCESS_PROJECT_ID,
  CONSTRAINT_SET,
  CONSTRAINT_TYPE,
  SOURCE_SET,
} from '@/constants/accessConst';
import { isQiankunEnv } from '@/utils/helper';
import { ReactNode } from 'react';
import { useModel } from 'umi';

/**
 * @param sourceType 资源ID
 * @returns (constraintItemVal: CONSTRAINT_SET, constraintCode = 'options') => boolean
 * @param constraintItemVal 约束的子项值：新增/删除/编辑。。。
 * @param constraintCode 约束ID
 */
export const useAccess = (sourceType: SOURCE_SET) => {
  const masterProps = useModel('@@qiankunStateFromMaster');

  const isInQiankun = isQiankunEnv();

  /**
   *
   * @param constraintItemVal 约束的子项值：新增/删除/编辑。。。
   * @param constraintCode 约束ID
   * @returns
   */
  const validFn = (
    constraintItemVal: CONSTRAINT_SET,
    constraintCode = 'options',
  ) => {
    const checkBoj = {
      projectCode: ACCESS_PROJECT_ID,
      resourceCode: `${ACCESS_PROJECT_ID}:${sourceType}`,
      constraint: {
        constraintCode: `${ACCESS_PROJECT_ID}:${constraintCode}`,
        constraintItemVal,
      },
    };

    return isInQiankun ? masterProps?.checkPermissionPoint?.(checkBoj) : true;
  };

  const AccessCmp = (props: {
    constraintItemVal: CONSTRAINT_SET;
    constraintCode?: CONSTRAINT_TYPE;
    children?: ReactNode;
    fallback?: (...args: any[]) => ReactNode;
  }) => {
    const hasAccess = validFn(props.constraintItemVal, props.constraintCode);
    const fallbackRender = () => {
      return props.fallback ? props.fallback() : null;
    };
    return hasAccess ? <>{props.children}</> : fallbackRender();
  };

  return {
    validFn,
    AccessCmp,
  };
};

/**
 * 一、权限函数使用 validFn
 */
// import { useAccess } from '@/hooks/useAccessHook';

// const TestCmp = () => {
//   const { validFn } = useAccess(SOURCE_SET.COLLECT_FILEMONITOR);
//   const showBtn = validFn(CONSTRAINT_SET.export);

//   return (
//     <div>
//       {/* 页面COLLECT_FILEMONITORT拥有view权限则展示按钮, 否则展示不展示 */}
//       {showBtn && <Button>导出</Button>}
//     </div>
//   );
// };

// export default TestCmp;

/**
 * 二、权限组件使用示例
 */

// import { useAccess } from '@/hooks/useAccessHook';

// const PriceList = () => {
//   const { AccessCmp } = useAccess(SOURCE_SET.COLLECT_FILEMONITOR);

//   return (
//     <div>
//       {/* 页面COLLECT_FILEMONITOR拥有view权限则展示：xxx, 否则展示fallback渲染内容 */}
//       <AccessCmp constraintItemVal={CONSTRAINT_SET.view} fallback={() => <>暂无权限</>}>xxx</AccessCmp>
//     </div>
//   );
// };

// export default PriceList;
