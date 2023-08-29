import FullNavbar from "../components/Navbar" 
import WalletCard from "../components/WalletCard";
import TransferCard from "../components/TransferCard";
import MemPoolCard from "../components/MemPoolCard";
import HistoryCard from "../components/HistoryCard";
import MineBlockCard from "../components/MineBlockCard";
import P2PCard from "../components/P2PCard";
import SettingsCard from "../components/SettingsCard";
import BlockExplorerCard from "../components/BlockExplorerCard";


function Home() {
  return (
    <div className='Home'>
      <FullNavbar />
      <div className="max-w-[1600px] m-auto gap-2 grid grid-cols-12 grid-rows-2 px-2 py-2">
        <WalletCard />
        <TransferCard />
        <MemPoolCard />
        <HistoryCard />
        <MineBlockCard />
        <P2PCard />
        <SettingsCard />
        <BlockExplorerCard />
      </div>
    </div>
  )
}

export default Home