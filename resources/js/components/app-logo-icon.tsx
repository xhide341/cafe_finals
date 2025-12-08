import { ImgHTMLAttributes } from 'react';
import cafeLogo from '../../assets/images/cafe-logo.png';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return <img src={cafeLogo} alt="Cafe Rencontre Logo" {...props} />;
}
