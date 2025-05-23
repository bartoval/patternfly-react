import { Component, createContext, createRef } from 'react';
import styles from '@patternfly/react-styles/css/components/Nav/nav';
import { css } from '@patternfly/react-styles';
import { getOUIAProps, OUIAProps, getDefaultOUIAId } from '../../helpers';

export type NavSelectClickHandler = (
  event: React.FormEvent<HTMLInputElement>,
  itemId: number | string,
  groupId: number | string,
  to: string
) => void;
export interface NavProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'onSelect' | 'onToggle'>,
    OUIAProps {
  /** Anything that can be rendered inside of the nav */
  children?: React.ReactNode;
  /** Additional classes added to the container */
  className?: string;
  /** Callback for updating when item selection changes */
  onSelect?: (
    event: React.FormEvent<HTMLInputElement>,
    selectedItem: {
      groupId: number | string;
      itemId: number | string;
      to: string;
    }
  ) => void;
  /** Callback for when a list is expanded or collapsed */
  onToggle?: (
    event: React.MouseEvent<HTMLButtonElement>,
    toggledItem: {
      groupId: number | string;
      isExpanded: boolean;
    }
  ) => void;
  /** Accessible label for the nav when there are multiple navs on the page */
  'aria-label'?: string;
  /** For horizontal navs */
  variant?: 'default' | 'horizontal' | 'horizontal-subnav';
  /** Value to overwrite the randomly generated data-ouia-component-id.*/
  ouiaId?: number | string;
  /** Set the value of data-ouia-safe. Only set to true when the component is in a static state, i.e. no animations are occurring. At all other times, this value must be false. */
  ouiaSafe?: boolean;
}

export interface NavContextProps {
  onSelect?: (
    event: React.FormEvent<HTMLInputElement>,
    groupId: number | string,
    itemId: number | string,
    to: string,
    preventDefault: boolean,
    onClick: NavSelectClickHandler
  ) => void;
  onToggle?: (event: React.MouseEvent<HTMLButtonElement>, groupId: number | string, expanded: boolean) => void;
  updateIsScrollable?: (isScrollable: boolean) => void;
  isHorizontal?: boolean;
  flyoutRef?: React.Ref<HTMLLIElement>;
  setFlyoutRef?: (ref: React.Ref<HTMLLIElement>) => void;
  navRef?: React.RefObject<HTMLElement | null>;
}
export const navContextDefaults = {};
export const NavContext = createContext<NavContextProps>(navContextDefaults);

class Nav extends Component<
  NavProps,
  { isScrollable: boolean; ouiaStateId: string; flyoutRef: React.Ref<HTMLLIElement> | null }
> {
  static displayName = 'Nav';
  static defaultProps: NavProps = {
    onSelect: () => undefined,
    onToggle: () => undefined,
    ouiaSafe: true
  };

  state = {
    isScrollable: false,
    ouiaStateId: getDefaultOUIAId(Nav.displayName, this.props.variant),
    flyoutRef: null as React.Ref<HTMLLIElement>
  };

  navRef = createRef<HTMLElement>();

  // Callback from NavItem
  onSelect(
    event: React.FormEvent<HTMLInputElement>,
    groupId: number | string,
    itemId: number | string,
    to: string,
    preventDefault: boolean,
    onClick: NavSelectClickHandler
  ) {
    if (preventDefault) {
      event.preventDefault();
    }

    this.props.onSelect(event, { groupId, itemId, to });

    if (onClick) {
      onClick(event, itemId, groupId, to);
    }
  }

  // Callback from NavExpandable
  onToggle(event: React.MouseEvent<HTMLButtonElement>, groupId: number | string, toggleValue: boolean) {
    this.props.onToggle(event, {
      groupId,
      isExpanded: toggleValue
    });
  }

  render() {
    const {
      'aria-label': ariaLabel,
      children,
      className,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSelect,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onToggle,
      ouiaId,
      ouiaSafe,
      variant,
      ...props
    } = this.props;
    const isHorizontal = ['horizontal', 'horizontal-subnav'].includes(variant);

    return (
      <NavContext.Provider
        value={{
          onSelect: (
            event: React.FormEvent<HTMLInputElement>,
            groupId: number | string,
            itemId: number | string,
            to: string,
            preventDefault: boolean,
            onClick: (
              e: React.FormEvent<HTMLInputElement>,
              itemId: number | string,
              groupId: number | string,
              to: string
            ) => void
          ) => this.onSelect(event, groupId, itemId, to, preventDefault, onClick),
          onToggle: (event: React.MouseEvent<HTMLButtonElement>, groupId: number | string, expanded: boolean) =>
            this.onToggle(event, groupId, expanded),
          updateIsScrollable: (isScrollable: boolean) => this.setState({ isScrollable }),
          isHorizontal: ['horizontal', 'horizontal-subnav'].includes(variant),
          flyoutRef: this.state.flyoutRef,
          setFlyoutRef: (flyoutRef) => this.setState({ flyoutRef }),
          navRef: this.navRef
        }}
      >
        <nav
          className={css(
            styles.nav,
            isHorizontal && styles.modifiers.horizontal,
            variant === 'horizontal-subnav' && styles.modifiers.subnav,
            this.state.isScrollable && styles.modifiers.scrollable,
            className
          )}
          aria-label={ariaLabel || (variant === 'horizontal-subnav' ? 'Local' : 'Global')}
          ref={this.navRef}
          {...getOUIAProps(Nav.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe)}
          {...props}
        >
          {children}
        </nav>
      </NavContext.Provider>
    );
  }
}

export { Nav };
