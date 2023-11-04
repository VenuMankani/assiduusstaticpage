import React, { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactsIcon from '@mui/icons-material/Contacts';
import PersonIcon from '@mui/icons-material/Person';
import styles from './sideBar-styles.module.css'
import { Typography } from '@mui/material';

const Pages = ['Dashboard', 'Accounts', 'Payroll', 'Reports', 'Advisor', 'Contacts'];
const Icons = [DashboardIcon, AccountBalanceWalletIcon, AttachMoneyIcon, DescriptionIcon, PersonIcon, ContactsIcon];

const SideBar = () => {

  const [selectedPage, setSelectedPage] = useState<number>(0);

  const handlePageClick = (index: number) => {
    setSelectedPage(index);
  };

  return (
    <div className={styles.wrapper}>
      {Pages.map((page, index) => {
        const IconComponent = Icons[index];
        return (
          <div
            key={index}
            className={`${styles.sidebarItem} ${selectedPage === index ? styles.selected : ''}`}
            onClick={() => handlePageClick(index)}
          >
            <IconComponent />
            <Typography>{page}</Typography>
          </div>
        );
      })}
    </div>
  )
}

export default SideBar