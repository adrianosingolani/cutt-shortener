import React, { Component } from 'react';
import Chart from 'chart.js';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import {
    GET_URLS_SUCCESS,
    GET_URLS_FAIL,
    GET_STATS_SUCCESS,
    GET_STATS_FAIL
} from '../actions/types';

import { getStats } from '../actions/statsActions';

import { 
    Label, 
    Form, 
    Segment, 
    Header
} from 'semantic-ui-react';

import { DateInput } from 'semantic-ui-calendar-react';

class Stats extends Component {
    state = {
        stats: null,
        loading: true
    }

    componentDidUpdate(prevProps) {
        const { message, stats } = this.props;

        if (message !== prevProps.message) {
            switch (message.id) {
                case GET_URLS_SUCCESS:
                    this.props.getStats();
                    break;
                case GET_STATS_SUCCESS:
                    this.setState({ loading: false, stats: _.sortBy(stats, 'date') }, () => {
                        this.createChart();
                    });
                    break;
                default:
                //do nothing
            }
        }
    }

    createChart = () => {
        console.log(this.state.stats);

        const range = 30;

        let today = moment().format('YYYY-MM-DD');

        const firstDay = moment(today).subtract(range, 'days').format('YYYY-MM-DD');

        let auxDate = firstDay;

        console.log(today);
        console.log(firstDay);

        let days = [];
        let clicks = [];


        for (let i = 0; i < range; i++) {
            auxDate = moment(auxDate).add(1, 'days').format('YYYY-MM-DD');

            days.push(auxDate);
            clicks.push(0);
        }

        console.log(days);
        console.log(clicks);


        this.state.stats.map(day => {
            const index = days.indexOf(day.date);
            clicks[index] = day.clicks;

            return null;
        });

        console.log(days);
        console.log(clicks);

        new Chart(document.getElementById('chart').getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Clicks',
                    data: clicks,
                    lineTension: 0,
                    backgroundColor: '#f2711c15',
                    borderColor: '#f2711c',
                    borderWidth: 2,
                    borderJoinStyle: 'bevel',
                    pointBackgroundColor: '#f2711c',
                    pointBorderWidth: 0,
                    pointRadius: 2,
                    pointHoverBackgroundColor: '#FFFFFF',
                    pointHoverBorderColor: '#f2711c',
                    pointHoverRadius: 3,
                    pointHitRadius: 10
                }]
            },
            options: {
                hover: {
                    intersect: false,
                    mode: 'index'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    display: false
                },
                animation: {
                    duration: 2000
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        type: 'time',
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        time: {
                            unit: 'day',
                            tooltipFormat: 'll',
                            displayFormats: {
                                day: 'll'
                            }
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <Segment>
                <Header style={{margin: '0'}}>Statistics for all links</Header>
                <Segment basic style={{padding: '0', margin: '0'}}>
                    <Form size='mini'>
                        <Form.Group style={{justifyContent: 'flex-end'}}>
                            <Form.Field>
                                <Label basic style={{ border: '0', paddingLeft: '0' }}>Start date</Label>
                                <DateInput name='startDate' animation='none' value='2010-08-01' onChange={() => console.log('changed')} />
                            </Form.Field>
                            <Form.Field>
                                <Label basic style={{ border: '0', paddingLeft: '0' }}>End date</Label>
                                <DateInput name='endDate' animation='none' value='2010-08-01' onChange={() => console.log('changed')} />
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Segment>

                <canvas id='chart'></canvas>
            </Segment>
        )
    }
}

Stats.propTypes = {
    getStats: PropTypes.func.isRequired,
    stats: PropTypes.array.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    stats: state.stats.stats,
    message: state.message
})

export default connect(mapStateToProps, { getStats })(Stats);