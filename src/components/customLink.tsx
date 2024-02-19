import React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

interface CustomLinkProps extends MuiLinkProps {
    // Add any additional custom props here
    customProp?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ customProp, ...rest }) => {
    return (
        <MuiLink {...rest} underline='hover' style={{color: "#e76f51" }}>
        </MuiLink>
    );
};

export default CustomLink;
