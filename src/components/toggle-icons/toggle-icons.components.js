import React, { useState } from 'react';

// * Libraries
// + Material-UI
import IconButton from '@material-ui/core/IconButton';
// + material-ui-toggle-icon
import ToggleIcon from 'material-ui-toggle-icon';

const ToggleIcons = ({
  defaultComponentIcon,
  toggleComponentIcon,
  onToggleFunction,
  onDefaultComponentClick,
  onToggleComponentClick,
  ...otherProps
}) => {
  const [on, setOn] = useState(false);
  return (
    <IconButton
      aria-label='search my location'
      onClick={() => {
        if (!on) {
          // -- Render function when Off Component is clicked
          onDefaultComponentClick();
        } else {
          // -- Render function when On Component is clicked
          onToggleComponentClick();
        }

        setOn(!on);

      }}
      {...otherProps}
    >
      <ToggleIcon on={on} offIcon={defaultComponentIcon} onIcon={toggleComponentIcon} />
    </IconButton>
  );
};

export default ToggleIcons;
