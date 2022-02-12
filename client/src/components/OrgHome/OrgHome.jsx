import React, {useState, useEffect, useContext} from 'react';
import styles from './OrgHome.module.css';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddIcon from '@mui/icons-material/Add';
import tick from '../../assets/tick.svg';
import { useNavigate } from "react-router-dom";
import { ContractContext } from "../../contexts/ContractContext";


const OrgHome = () => {
    const {state, name} = useContext(ContractContext);
    const navigate = useNavigate();
    const [orgInfo, setOrgInfo] = useState({});

    const handleViewRecord = () => {}
    const handleAddRecord = () => {
        navigate("/addrecord");
    }

    useEffect(async() => {
        const { accounts, contract } = state;
        if(contract){
          const res = await contract.methods.getEduOrg(`${accounts[0]}`).call();
          console.log(res);
          setOrgInfo(res);
        //   setPersonInfo(res5);
        }
      }, [state])

    return (
        <div className={styles.orgHomePageContainer}>
            <div className={styles.orgHomeContent}>
                <div className={styles.orgNameContainer}>
                    <span className={styles.heading}>{orgInfo.name ? orgInfo.name : "Loading..."}</span>
                    <div className={styles.verifyIconContainer}>
                        <img className={styles.verifyIcon} src={tick}/>
                    </div>
                </div>
                <div className={styles.orgType}>Education Center</div>
                <div className={styles.orgDesc}>{orgInfo.about ? orgInfo.about : "Loading..."}</div>
                <span className={styles.heading}>Records</span>
                <div className={styles.recordsActions}>
                    <div className={styles.recordActionCard} onClick={handleViewRecord}>
                        <AutoStoriesIcon sx={{fontSize: 40, marginRight: 2}}/>
                        <span>View Record</span>
                    </div>
                    <div className={styles.recordActionCard} onClick={handleAddRecord}>
                        <AddIcon sx={{fontSize: 40, marginRight: 2}}/>
                        <span>Add Record</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrgHome;