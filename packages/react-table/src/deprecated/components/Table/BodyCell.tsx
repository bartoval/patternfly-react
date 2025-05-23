import { useState } from 'react';
import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip';
import { Bullseye } from '@patternfly/react-core/dist/esm/layouts/Bullseye';
import { EmptyState } from '@patternfly/react-core/dist/esm/components/EmptyState';
import { SelectProps } from '@patternfly/react-core/dist/esm/components/Select';
import { Td } from '../../../components';

export interface BodyCellProps {
  'data-label'?: string;
  className?: string;
  colSpan?: number;
  component?: React.ReactNode;
  errorText?: string;
  isVisible?: boolean;
  parentId?: number;
  textCenter?: boolean;
  isOpen?: boolean;
  ariaControls?: string;
  editableValue?: any;
  editableSelectProps?: SelectProps;
  options?: React.ReactElement<any>[];
  isSelectOpen?: boolean;
  value?: any;
  isValid?: boolean;
  name?: string;
  tooltip?: string;
  onMouseEnter?: (event: any) => void;
  children: React.ReactNode;
}
export const BodyCell: React.FunctionComponent<BodyCellProps> = ({
  'data-label': dataLabel = '',
  className = '',
  colSpan,
  component = 'td',
  isVisible,
  parentId,
  textCenter = false,
  tooltip: tooltipProp = '',
  onMouseEnter: onMouseEnterProp = () => {},
  children,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  errorText,
  isValid,
  isOpen,
  ariaControls,
  editableValue,
  editableSelectProps,
  options,
  isSelectOpen,
  value,
  name,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...props
}: BodyCellProps) => {
  const [tooltip, setTooltip] = useState('');
  const onMouseEnter = (event: any) => {
    if (event.target.offsetWidth < event.target.scrollWidth) {
      if (tooltipProp) {
        setTooltip(tooltipProp);
      } else if (typeof children === 'string') {
        setTooltip(children);
      }
    } else {
      setTooltip('');
    }
    onMouseEnterProp(event);
  };

  let isEmptyStateCell = false;
  if (children) {
    isEmptyStateCell =
      ((children as React.ReactElement<any>).type === Bullseye &&
        (children as React.ReactElement<any>).props.children &&
        (children as React.ReactElement<any>).props.children.type === EmptyState) ||
      (children as React.ReactElement<any>).type === EmptyState;
  }

  const cell = (
    <Td
      className={className}
      component={component}
      dataLabel={dataLabel && parentId == null && !isEmptyStateCell ? dataLabel : null}
      onMouseEnter={onMouseEnter}
      textCenter={textCenter}
      colSpan={colSpan}
      {...props}
    >
      {children}
    </Td>
  );

  const bodyCell =
    tooltip !== '' ? (
      <Tooltip content={tooltip} isVisible>
        {cell}
      </Tooltip>
    ) : (
      cell
    );

  return (parentId !== undefined && colSpan === undefined) || !isVisible ? null : bodyCell;
};
BodyCell.displayName = 'BodyCell';
