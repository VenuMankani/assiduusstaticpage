import React from 'react';
import { Divider, Paper, Typography } from '@mui/material';
import styles from './graphData.module.css';

function createData(
    account: string,
    month: string,
    ytd: string,
) {
    return { account, month, ytd };
}

const rows = [
    createData('Sales', '1,194.58', '11,418.29'),
    createData('Advertising', '4,879.02', '9,271.36'),
    createData('Inventory', '4,692.26', '9,768.09'),
    createData('Entertainment', '0.00', '0.00'),
    createData('Product', '4,652.10', '2,529.90'),
];

const Wishlist = () => {
    return (
        <div className={styles.Container}>
            <Typography variant="h6" paddingTop={'1rem'} paddingBottom={'1.5rem'} paddingLeft={'1rem'} fontWeight={700}>
                Account watchlist
            </Typography>
            <Divider orientation='horizontal' />
            <div className={styles.table}>
                <div className={styles.row}>
                    <div className={styles.cell}>
                        <Typography className={styles.title} variant='subtitle2'>Account</Typography>
                    </div>
                    <div className={styles.cell}>
                        <Typography className={styles.title} variant='subtitle2'>This Month</Typography>
                    </div>
                    <div className={styles.cell}>
                        <Typography className={styles.title} variant='subtitle2'>YTD</Typography>
                    </div>
                </div>
                {rows.map((row, index) => (
                    <div className={styles.row} key={index}>
                        <div className={styles.cell}>
                            <Typography className={styles.data}>{row.account}</Typography>
                        </div>
                        <div className={styles.cell}>
                            <Typography className={styles.data}>{row.month}</Typography>
                        </div>
                        <div className={styles.cell}>
                            <Typography className={styles.data}>{row.ytd}</Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
