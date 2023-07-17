import * as React from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { Dispatch, SetStateAction } from "react";
import { tokens } from "../../Theme";

interface NoteI {
  id: string;
  title: string;
  note: string;
  date: number;
}

type NoteProps = {
  setData: Dispatch<SetStateAction<NoteI[]>>;
  data: NoteI[];
};

export default function BasicMenu({ setData, data }: NoteProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortByDate = (ascend: boolean) => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (ascend) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

    setData(sortedData);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Sort by">
        <IconButton onClick={handleClick}>
          <SortIcon style={{ color: colors.secondary[100] }} />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => sortByDate(true)}>
          <ListItemIcon>
            <CallReceivedIcon
              fontSize="small"
              sx={{ color: colors.secondary[100] }}
            />
          </ListItemIcon>
          <ListItemText sx={{ color: colors.secondary[100] }}>
            Date: from oldest
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => sortByDate(false)}>
          <ListItemIcon>
            <CallMadeIcon
              fontSize="small"
              sx={{ color: colors.secondary[100] }}
            />
          </ListItemIcon>
          <ListItemText sx={{ color: colors.secondary[100] }}>
            Date: from latest
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
