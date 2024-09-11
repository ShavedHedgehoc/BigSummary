import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export interface BreadCrumbHeaderProps {
  breadcrumbs: string[];
}

export default function BreadCrumbHeader(props: BreadCrumbHeaderProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Breadcrumbs size="sm" aria-label="breadcrumbs" separator={<ChevronRightRoundedIcon />} sx={{ pl: 0 }}>
        <Link underline="none" color="neutral" href="#some-link" aria-label="Home">
          <HomeRoundedIcon />
        </Link>
        {props.breadcrumbs.map((item) => (
          <Typography key={item} color="neutral" fontWeight={500} fontSize={12}>
            {item}
          </Typography>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
