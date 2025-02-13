import React, { useState, useEffect, useRef } from 'react';
import OrderItem from '../../components/OrderList/OrderItem';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { forEach } from 'lodash';
import Num2VND from '../../components/Num2VND';
import { format } from 'date-fns';
import axios from 'axios';

function BodyAnalyst({ orders, totalPrice, totalProducts, profit, fetch }) {
    const [option, setOption] = useState(0);
    const [orderTotalPrice, setOrderTotalPrice] = useState(totalPrice);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [ordersData, setOrders] = useState(orders);
    const [numberOfOrders, setNumberOforders] = useState(0);
    const [numberOfProducts, setNumberOfProducts] = useState(totalProducts);
    const [totalProfit, setTotalProfit] = useState(profit);
    const [show, setShow] = useState(false);
    const chartRef = useRef(null);


    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    
    useEffect(() => {
        setOrderTotalPrice(totalPrice)
        if (orders != null) {
            setNumberOforders(orders.length)
        }
        setTotalProfit(profit)
        setNumberOfProducts(totalProducts)
        setOrders(orders);
    }, [orders]);

    useEffect(() => {
        if (!ordersData || ordersData.length === 0) {
            return;
        }


        const dataForChart = {
            labels: ordersData.map((order) => format(new Date(order.created_date), 'dd-MM-yyyy')),
            datasets: [
            {
                label: 'Price value',
                data: ordersData.map((order) => order.total),
                borderColor: '#8884d8',
                borderWidth: 2,
                fill: true,
            },
            ],
        };

        const options = {
            scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'dd-MM-yyyy',
                },
                title: {
                    display: true,
                    text: 'Day',
                    font: {
                        size: 16,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Currency(₫)',
                    font: {
                        size: 16,
                    },
                },
            },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'THE REPORT OF ORDERS',
                    font: {
                        size: 24,
                    },
                },
            },
        };

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('myChart');
        if (ctx) {
            const newChart = new Chart(ctx, {
            type: 'line',
            data: dataForChart,
            options: options,
            });
            chartRef.current = newChart;
        }

        updateChartWithData(dataForChart);

    }, [orders, ordersData, option, orderTotalPrice, numberOfOrders, numberOfProducts, totalProfit]);





    const updateChart = async () => {
        const data = await fetchData(startDate, endDate);
        if (data) {
            setOrders(data); 
            updateChartWithData(data);
        }
    };

    const updateChartAllTheTime = async () => {
        if (orders) {
            setOrders(orders); 
            setNumberOforders(orders.length);
            setNumberOfProducts(totalProducts);
            updateChartWithData(orders);
            setOrderTotalPrice(totalPrice);
            setTotalProfit(profit);
        }
    };

    const updateChartLast7Days = async () => {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
        const data = await fetchData(sevenDaysAgo, today);
        if (data) {
            setOrders(data); 
            updateChartWithData(data);
        }
    };
    
    const updateChartYesterday = async () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
    
        const data = await fetchData(yesterday, today);
        if (data) {
            setOrders(data); 
            updateChartWithData(data);
        }
    };
    
    const updateChartToday = async () => {
        const today = new Date();
        const data = await fetchData(today, today);
        if (data) {
            setOrders(data); 
            updateChartWithData(data);
        }
    };
    
    const updateChartThisMonth = async () => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
        const data = await fetchData(firstDayOfMonth, today);
        if (data) {
            setOrders(data); 
            updateChartWithData(data);
        }
    };
    
    const optionsFunctions = {
        0: updateChartAllTheTime,
        1: updateChartToday,
        2: updateChartYesterday,
        3: updateChartLast7Days,
        4: updateChartToday,
        5: updateChartThisMonth,
    };

    const handleOptionClick = async (selectedOption) => {
        if (optionsFunctions[selectedOption]) {
            await optionsFunctions[selectedOption]();
            setOption(selectedOption);
        }
    };
    

    const fetchData = async (startDate, endDate) => {
        try {
            const url = `/api/orders-analyst/byDay?startDate=${startDate}&endDate=${endDate}`;
            const headers = {
                'Authorization': localStorage.getItem('token'),
            };
    
            const response = await axios.get(url, { headers });
            if (response.data.code === 0) {
                setOrderTotalPrice( response.data.data.totalPrice);
                setNumberOforders(response.data.data.orders.length)
                setNumberOfProducts(response.data.data.totalProducts);
                setTotalProfit(response.data.data.totalProfit);
                return response.data.data.orders;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return null;
        }
    };
    
    
    

    const updateChartWithData = () => {
        if (ordersData && ordersData.length > 0) {
            const dataForChart = {
                labels: ordersData.map((order) => format(new Date(order.created_date), 'yyyy-MM-dd')),
                datasets: [
                    {
                        label: 'Price value',
                        data: ordersData.map((order) => order.total),
                        borderColor: '#8884d8',
                        borderWidth: 2,
                        fill: true,
                    },
                ],
            };
    
            if (chartRef.current) {
                chartRef.current.data.labels = dataForChart.labels;
                chartRef.current.data.datasets[0].data = dataForChart.datasets[0].data;
                chartRef.current.update();
            }
        }
    };
    
    
    
    
    
    

    return (
    <div>
        <div className="row">
            <div className="col-12 my-2">
            <ul className="nav nav-tabs shadow-sm">
            <li onClick={() => handleOptionClick(0)}>
                <a className={`btn btn-light ${option === 0 ? 'active' : ''}`} data-toggle="tab" href="#alltime">All the time</a>
            </li>
            <li onClick={() => handleOptionClick(3)}>
                <a className={`btn btn-light ${option === 3 ? 'active' : ''}`} data-toggle="tab" href="#7days">Within the last 7 days</a>
            </li>
            <li onClick={() => handleOptionClick(2)}>
                <a className={`btn btn-light ${option === 2 ? 'active' : ''}`} data-toggle="tab" href="#yesterday">Yesterday</a>
            </li>
            <li onClick={() => handleOptionClick(1)}>
                <a className={`btn btn-light ${option === 1 ? 'active' : ''}`} data-toggle="tab" href="#today">Today</a>
            </li>
            <li onClick={() => handleOptionClick(5)}>
                <a className={`btn btn-light ${option === 5 ? 'active' : ''}`} data-toggle="tab" href="#month">This month</a>
            </li>
            <li onClick={() => handleOptionClick(4)}>
                <a className={`btn btn-light ${option === 4 ? 'active' : ''}`} data-toggle="tab" href="#time">Specific time</a>
            </li>
        </ul>

                <div class="tab-content">
                    <div className="tab-pane fade" id="yesterday"></div>
                    <div className="tab-pane fade" id="today"></div>
                    <div className="tab-pane fade" id="7days"></div>
                    <div className="tab-pane fade in active" id="month"></div>
                    <div id="time" class="tab-pane fade">
                        <div className="row my-3">
                            <div className="col-sm-12 col-md-2"></div>
                            <div className="col-sm-12 col-md-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    aria-label="From date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                                <blockquote className="blockquote-footer">From</blockquote>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    aria-label="To date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                                <blockquote className="blockquote-footer">To</blockquote>
                            </div>
                            <div className="col-sm-12 col-md-2">
                                <button className="btn btn-outline-info px-4" type="button" onClick={updateChart}>
                                    Go
                                </button>
                                <blockquote className="blockquote-footer">Click</blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="chart__information my-5 text-center d-flex justify-content-center flex-wrap">
                    <span className="border p-4 m-2 text-bold shadow-sm border-success rounded">
                        <strong>TOTAL</strong>
                        <span class="mx-2 p-2 badge badge-success">{Num2VND(orderTotalPrice)}</span>
                    </span>
                    <span className="border p-4 m-2 text-bold shadow-sm border-primary rounded">
                        <strong>ORDERS</strong>
                        <span class="mx-2 p-2 badge badge-primary">{numberOfOrders}</span>
                    </span>
                    <span className="border p-4 m-2 text-bold shadow-sm border-info rounded">
                        <strong>PRODUCTS</strong>
                        <span class="mx-2 p-2 badge badge-info">{numberOfProducts}</span>
                    </span>
                    {totalProfit && (
                        <span className="border p-4 m-2 text-bold shadow-sm border-warning rounded">
                            <strong>PROFIT</strong>
                            <span class="mx-2 p-2 badge badge-warning">{Num2VND(totalProfit)}</span>
                        </span>
                    )}
                </div>
                <div className="chart__canvas">
                    <canvas id="myChart" className="chart-container"></canvas>
                </div>
            </div>

            
        </div>
        <div className="row my-3">
            <div className="col-12 text-center">
                <button className='btn btn-outline-success' data-toggle="collapse" data-target="#details" onClick={()=> setShow(!show)}>
                {!show? (
                    <span>Show more details <i class="fa-regular fa-square-caret-down"></i></span>
                ) : (
                    <span>Hide details <i class="fa-regular fa-square-caret-up"></i></span>
                )}
                </button>

            </div>
            <div id="details" className="col-12 collapse">
                <div className="row my-3">
                <div className="col-sm-12 col-md-12 col-lg-8">
                    <div className="form-outline mb-4">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        className="form-control"
                        id="datatable-search-input"
                        placeholder="Search"
                    />
                    <blockquote className="blockquote-footer">
                        Enter the order number for searching
                    </blockquote>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3">
                    <div className="form-group">
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option value="1">a-z</option>
                        <option value="2">z-a</option>
                        <option value="3">Highest Price</option>
                        <option value="4">Lowest Price</option>
                    </select>
                    <blockquote className="blockquote-footer">
                        Sort by{' '}
                        <i className="fa-solid fa-arrow-down-a-z"></i>
                    </blockquote>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-1">
                    <button
                    className="btn btn-sm bg-main text-main"
                    onClick={() => fetch()}
                    >
                    <i className="fa-solid fa-rotate-right mr-1"></i>
                    Refresh
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-12 center-table">
                    <table className="table table-hover table-bordered table-responsive-sm table-responsive-md table-striped rounded text-center">
                    <thead className="bg-main text-main sticky-top shadow-sm">
                        <tr>
                        <th scope="col">Order</th>
                        <th scope="col">Order Number</th>
                        <th scope="col">Total</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Creation Date</th>
                        <th scope="col">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData &&
                        ordersData
                            .filter(
                            (order) =>
                                order.order_number &&
                                order.order_number
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            )
                            .map((order, index) => (
                            <OrderItem key={index} index={index + 1} item={order} />
                            ))}
                    </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
        
    </div>
    );
}

export default BodyAnalyst;
