import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase, Typography, Box } from '@mui/material';

// project imports
import config from 'config';
import fairyglowberry from 'assets/images/fairyglowberry.svg'; // Adjust the path to where your SVG file is located
import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();

  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <Box sx={{ mt: 1, mr: 0.5 }}>
        {' '}
        {/* Add top margin to logo and reduce right margin */}
        <img src={fairyglowberry} alt="Logo" width="92" height="32" />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Museo Sans',
            fontWeight: 700,
            fontSize: 18,
            ml: -4,
            color: 'secondary.main'
          }}
        >
          Fairy
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Museo Sans',
            fontWeight: 300,
            fontSize: 18,
            color: 'primary.main',
            ml: 0,
            mr: 3
          }}
        >
          Glow
        </Typography>
      </Box>
    </ButtonBase>
  );
};

export default LogoSection;
