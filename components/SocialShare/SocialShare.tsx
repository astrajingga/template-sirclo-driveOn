import { FC } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedin,
  faWhatsapp,
  faTelegram
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SizeProp } from '@fortawesome/fontawesome-svg-core'

type TypeSocialShare = {
  urlSite: string,
  iconSize?: SizeProp
};

const SocialShare: FC<TypeSocialShare> = ({
  urlSite,
  iconSize = 'lg'
}) => {

  return (
    <div className="social-share">
      <div className="social-share__item">
        <FacebookShareButton url={urlSite}>
          <FontAwesomeIcon icon={faFacebookF} size={iconSize} />
        </FacebookShareButton>
      </div>
      <div className="social-share__item">
        <TwitterShareButton url={urlSite}>
          <FontAwesomeIcon icon={faTwitter} size={iconSize} />
        </TwitterShareButton>
      </div>
      <div className="social-share__item">
        <LinkedinShareButton url={urlSite}>
          <FontAwesomeIcon icon={faLinkedin} size={iconSize} />
        </LinkedinShareButton>
      </div>
      <div className="social-share__item">
        <WhatsappShareButton url={urlSite}>
          <FontAwesomeIcon icon={faWhatsapp} size={iconSize} />
        </WhatsappShareButton>
      </div>
      <div className="social-share__item">
        <EmailShareButton url={urlSite}>
          <FontAwesomeIcon icon={faEnvelope} size={iconSize} />
        </EmailShareButton>
      </div>
      <div className="social-share__item">
        <TelegramShareButton url={urlSite}>
          <FontAwesomeIcon icon={faTelegram} size={iconSize} />
        </TelegramShareButton>
      </div>
    </div>
  )
}

export default SocialShare;