import NavBar from './ui-components/NavBar';
import React from 'react';
import { read, utils } from 'xlsx';
import { useLocation } from "react-router-dom";
import Chart from 'chart.js/auto';
import { Line, Bar, Pie } from "react-chartjs-2";


function AnalysisDashboard() {
    const [dataset, setDataSet] = React.useState([{}]);
    const [deptReferral, setDeptReferral] = React.useState([{}])
    const [race, setRace] = React.useState([{}])
    const [waitTime, setWaitTime] = React.useState([{}])
    const location = useLocation();

    // dataset struct {
    //     "date": 44002.02502314815,
    //     "patient_id": "775-34-9359",
    //     "patient_gender": "F",
    //     "patient_age": 59,
    //     "patient_first_inital": "M",
    //     "patient_last_name": "Kenelin",
    //     "patient_race": "White",
    //     "patient_admin_flag": true,
    //     "patient_waittime": 52,
    //     "department_referral": "General Practice"
    // }

    React.useEffect(() => {
        const file = location.state?.file;
        const reader = new FileReader();
        let draft = []
        let deptDraft = {}
        let waitDraft = {}
        let raceDraft = {}
        reader.onload = (event) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;
            if (sheets.length) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                for (let row of rows) {
                    draft.push(row)
                    if (deptDraft[row.department_referral] !== undefined)
                        deptDraft[row.department_referral] = deptDraft[row.department_referral] + 1;
                    else
                        deptDraft[row.department_referral] = 1
                    if (waitDraft[row.patient_waittime] !== undefined)
                        waitDraft[row.patient_waittime] = waitDraft[row.patient_waittime] + 1;
                    else
                        waitDraft[row.patient_waittime] = 1
                    if (raceDraft[row.patient_race] !== undefined)
                        raceDraft[row.patient_race] = raceDraft[row.patient_race] + 1;
                    else
                        raceDraft[row.patient_race] = 1
                }
                setDataSet(draft)
                setDeptReferral(deptDraft)
                setWaitTime(waitDraft)
                setRace(raceDraft)
            }
        }
        if (file)
            reader.readAsArrayBuffer(file);
    }, [])

    const pieChart = {
        labels: Object.keys(deptReferral),
        datasets: [
            {
                label: 'Department Referrals',
                data: Object.keys(deptReferral).map(function (key) {
                    return deptReferral[key];
                }),
                backgroundColor: [
                    "#8FBC8F",
                    "#808080",
                    "#C0C0C0",
                    "#0679b8",
                    "#191970",
                    "#008f7e",
                    '#025c24',
                  ],
                  borderColor: [
                    "#8FBC8F",
                    "#808080",
                    "#C0C0C0",
                    '#0679b8',
                    "#191970",
                    "#008f7e",
                    '#025c24',
                  ],
                  borderWidth: 1,
            }
        ]
    }

    const barChart = {
        labels: Object.keys(race),
        datasets: [
            {
                label: 'Patient Race',
                data: Object.keys(race).map(function (key) {
                    return race[key];
                }),
                backgroundColor: [
                    "#8FBC8F",
                    "#808080",
                    "#C0C0C0",
                    "#0679b8",
                    "#191970",
                    "#008f7e",
                    '#025c24',
                  ],
                  borderColor: [
                    "#8FBC8F",
                    "#808080",
                    "#C0C0C0",
                    '#0679b8',
                    "#191970",
                    "#008f7e",
                    '#025c24',
                  ],
                  borderWidth: 1,
            }
        ]
    }

    const lineChart = {
        labels: Object.keys(waitTime),
        datasets: [
            {
                label: 'Patient Wait Time',
                data: Object.keys(waitTime).map(function (key) {
                    return waitTime[key];
                }),
                backgroundColor: [
                    "#8FBC8F",
                    "#808080",
                    "#C0C0C0",
                    "#0679b8",
                    "#191970",
                    "#008f7e",
                    '#025c24',
                  ],
                  borderColor: [
                    "#8FBC8F",
                    "#808080",
                    "#C0C0C0",
                    '#0679b8',
                    "#191970",
                    "#008f7e",
                    '#025c24',
                  ],
                  borderWidth: 1,
            }
        ]
    }

    const downloadFile = () => {
        let data = new Blob([location.state?.file], {type: 'text/xlsx'});
        let csvURL = window.URL.createObjectURL(data);
        let tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'data.xlsx');
        tempLink.click();
    }

    return (
        <React.Fragment>
            <NavBar />
            <div className='downloadButton' onClick={e => {
                        e.preventDefault();
                        downloadFile();
                    }}>
                <span><img width="40" height="40" src="https://img.icons8.com/ios/50/download--v1.png" alt="download--v1" /></span>
            </div>
            <div className='dashboardContainer'>
                <div className='dashboardRow'>
                    <div className='dashboardInnerFlex wrapper_flex'>
                        <div className=''>
                            <div className='header'>
                                <span>Main data points</span>
                            </div>
                            <div className='dataPoints'>
                                <span>1. Patient Race</span>
                                <span>2. Patient Wait Time</span>
                                <span>3. Department Referral</span>
                            </div>
                        </div>
                        <div className='rowItems line-chart'>
                            <Line data={lineChart} />
                        </div>
                        <div className='rowItems line-chart'>
                            <Bar data={barChart} />
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='dashboardInnerFlex'>
                        <div className='rowItems recommendations'>
                            <div className='header'>
                                <span>Recommendations</span>
                            </div>
                            <div className='recommendationPoints'>
                                <span>1. Freightweight is negatively correlated to Revenue. This indicates that it is more proﬁtable to load the trucks with many light and small items rather than few big and heavy ones.</span>
                                <span>2. Truck 9 seems to use signiﬁcantly more fuel than the other ones. It may be worth checking the vehicle.</span>
                                <span>3. The data suggests, that driver A uses the most fuel. As fuel is cost intensive, it could be a good idea to talk about economic driving.</span>
                            </div>
                        </div>
                        <div className='pie-chart'>
                            <Pie data={pieChart} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AnalysisDashboard;
