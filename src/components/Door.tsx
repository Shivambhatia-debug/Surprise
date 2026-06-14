import { DoorData } from '@/data/doors';
import WelcomeCard from './activities/WelcomeCard';
import MagicMirror from './activities/MagicMirror';
import BubblePop from './activities/BubblePop';
import SpinWheel from './activities/SpinWheel';
import SealedLetter from './activities/SealedLetter';
import BreatheWithMe from './activities/BreatheWithMe';
import FunQuestion from './activities/FunQuestion';
import BalloonActivity from './activities/BalloonActivity';
import FortuneCookie from './activities/FortuneCookie';
import ShootingStarActivity from './activities/ShootingStarActivity';
import ScratchCard from './activities/ScratchCard';
import ReasonsLove from './activities/ReasonsLove';
import GiftBoxActivity from './activities/GiftBoxActivity';
import FlowerActivity from './activities/FlowerActivity';
import AffirmationSwipe from './activities/AffirmationSwipe';
import VirtualHug from './activities/VirtualHug';
import LoveLetterActivity from './activities/LoveLetterActivity';
import OurSong from './activities/OurSong';
import PromiseCards from './activities/PromiseCards';
import TypewriterMsg from './activities/TypewriterMsg';
import LoveMeter from './activities/LoveMeter';
import GoldenKey from './activities/GoldenKey';

interface DoorProps {
  data: DoorData;
  onClick: () => void;
  isLast: boolean;
}

export default function Door({ data, onClick, isLast }: DoorProps) {
  const props = { data, onNext: onClick, isLast };

  switch (data.activityType) {
    case 'welcome': return <WelcomeCard {...props} />;
    case 'mirror': return <MagicMirror {...props} />;
    case 'bubbles': return <BubblePop {...props} />;
    case 'spinwheel': return <SpinWheel {...props} />;
    case 'sealedletter': return <SealedLetter {...props} />;
    case 'breathe': return <BreatheWithMe {...props} />;
    case 'question': return <FunQuestion {...props} />;
    case 'balloon': return <BalloonActivity {...props} />;
    case 'fortune': return <FortuneCookie {...props} />;
    case 'shootingstar': return <ShootingStarActivity {...props} />;
    case 'scratch': return <ScratchCard {...props} />;
    case 'reasons': return <ReasonsLove {...props} />;
    case 'giftbox': return <GiftBoxActivity {...props} />;
    case 'flower': return <FlowerActivity {...props} />;
    case 'affirmations': return <AffirmationSwipe {...props} />;
    case 'hug': return <VirtualHug {...props} />;
    case 'loveletter': return <LoveLetterActivity {...props} />;
    case 'oursong': return <OurSong {...props} />;
    case 'promises': return <PromiseCards {...props} />;
    case 'typewriter': return <TypewriterMsg {...props} />;
    case 'lovemeter': return <LoveMeter {...props} />;
    case 'goldenkey': return <GoldenKey {...props} />;
    default: return <WelcomeCard {...props} />;
  }
}
