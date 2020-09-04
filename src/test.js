

<!DOCTYPE html>
<html lang="zxx" class="js">

<head>
    <base href="../">
    <meta charset="utf-8">
    <meta name="author" content="Softnio">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="A powerful and conceptual apps base dashboard template that especially build for developers and programmers.">
    <!-- Fav Icon  -->
    <link rel="shortcut icon" href="./images/favicon.png">
    <!-- Page Title  -->
    <title>Crypto Dashboard | DashLite Admin Template</title>
    <!-- StyleSheets  -->
    <link rel="stylesheet" href="./assets/css/dashlite.css?ver=1.8.0">
    <link id="skin-default" rel="stylesheet" href="./assets/css/theme.css?ver=1.8.0">

    <style type="text/css">


        .card__list {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-wrap: nowrap;
                flex-wrap: nowrap;
                overflow-x: auto;

            }


        .card__list__item {
            width: 280px;
            min-width: 280px;
            border-radius: 12px;
            background-color: #fff;
            color: #7c889d;
            padding: 18px 18px 14px 20px;
            position: relative;
            margin-right: 24px;
            -webkit-transition: background-color .3s ease-in-out;
            transition: background-color .3s ease-in-out
        }


        .card__list__item__row {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between
        }

        .card__list__item__name {
            font-size: 16px;
            font-weight: 700;
            color: inherit;
            text-transform: capitalize
        }

        .card__list__item__numbers {
            padding-top: 40px;
            padding-bottom: 20px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between
        }

        .card__list__item__numbers__item {
            font-size: 16px;
            letter-spacing: 1.3px;
            font-weight: 700;
            color: inherit
        }

        .card__list__item__balance__title {
            font-size: 10px;
            font-weight: 700;
            color: #8791a0;
            text-transform: uppercase;
            margin-bottom: 6px
        }

        .card__list__item__balance__value {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center
        }

        .card__list__item__balance__value__currency {
            font-size: 14px;
            margin-right: 6px
        }

        .card__list__item__balance__value__amount {
            font-size: 18px;
            font-weight: 700;
            color: #1d222c
        }

        .card__list__item__valid__title {
            font-size: 10px;
            font-weight: 700;
            color: #8791a0;
            text-transform: uppercase;
            margin-bottom: 6px
        }

        .card__list__item__valid__value {
            font-size: 12px;
            letter-spacing: .9px;
            color: inherit;
            font-weight: 700;
            text-align: right
        }

        
        .card__list__item:first-child {
            border-radius: 12px;
            -webkit-box-shadow: 0 4px 8px -1px rgba(29,32,47,.22);
            box-shadow: 0 4px 8px -1px rgba(29,32,47,.22);
            background-color: #f5a623;
            color: #fff;
            overflow: visible
        }

        

        .card__list__item:first-child .card__list__item__balance__title,.card__list__item:first-child .card__list__item__balance__value__currency,.card__list__item:first-child .card__list__item__valid__title {
            color: #fff
        }

        .card__list__item:first-child .card__list__item__balance__value__amount {
            color: inherit
        }

        .card__list__item.freeze {
            opacity: .4
        }

        .vl {
          border-left: 1px solid #808080;
          height: 50px;
          left: 70%;
          margin-left: 100px;
          top: 0;
        }
    </style>
</head>

<body class="nk-body npc-crypto bg-white has-sidebar ">
    <div class="nk-app-root">
        <!-- main @s -->
        <div class="nk-main ">
            <!-- sidebar @s -->
            <div class="nk-sidebar nk-sidebar-fixed " data-content="sidebarMenu">
                <div class="nk-sidebar-element nk-sidebar-head">
                    <div class="nk-sidebar-brand">
                        <a href="html/crypto/index.html" class="logo-link nk-sidebar-logo">
                            <img class="logo-light logo-img" src="./images/logo.png" srcset="./images/logo2x.png 2x" alt="logo">
                            <img class="logo-dark logo-img" src="./images/logo-dark.png" srcset="./images/logo-dark2x.png 2x" alt="logo-dark">
                            <span class="nio-version">Crypto</span>
                        </a>
                    </div>
                    <div class="nk-menu-trigger mr-n2">
                        <a href="#" class="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em class="icon ni ni-arrow-left"></em></a>
                    </div>
                </div><!-- .nk-sidebar-element -->
                <div class="nk-sidebar-element">
                    <div class="nk-sidebar-body" data-simplebar>
                        <div class="nk-sidebar-content">
                            <div class="nk-sidebar-widget d-none d-xl-block">
                                <div class="user-account-info between-center">
                                    <div class="user-account-main">
                                        <h6 class="overline-title-alt">Available Balance</h6>
                                        <div class="user-balance">2.014095</div>
                                       
                                    </div>
                                   
                                </div>
                               
                                <div class="user-account-actions">
                                    <ul class="g-3">
                                        <li><a href="#" class="btn btn-lg btn-primary"><span>Add Fund</span></a></li>
                                        
                                    </ul>
                                </div>
                            </div><!-- .nk-sidebar-widget -->
                            <div class="nk-sidebar-widget nk-sidebar-widget-full d-xl-none pt-0">
                                <a class="nk-profile-toggle toggle-expand" data-target="sidebarProfile" href="#">
                                    <div class="user-card-wrap">
                                        <div class="user-card">
                                            <div class="user-avatar">
                                                <span>AB</span>
                                            </div>
                                            <div class="user-info">
                                                <span class="lead-text">Abu Bin Ishtiyak</span>
                                                <span class="sub-text">info@softnio.com</span>
                                            </div>
                                            <div class="user-action">
                                                <em class="icon ni ni-chevron-down"></em>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div class="nk-profile-content toggle-expand-content" data-content="sidebarProfile">
                                    <div class="user-account-info between-center">
                                        <div class="user-account-main">
                                            <h6 class="overline-title-alt">Available Balance</h6>
                                            <div class="user-balance">2.014095 <small class="currency currency-btc">BTC</small></div>
                                            <div class="user-balance-alt">18,934.84 <span class="currency currency-btc">BTC</span></div>
                                        </div>
                                        <a href="#" class="btn btn-icon btn-light"><em class="icon ni ni-line-chart"></em></a>
                                    </div>
                                    <ul class="user-account-data">
                                        <li>
                                            <div class="user-account-label">
                                                <span class="sub-text">Profits (7d)</span>
                                            </div>
                                            <div class="user-account-value">
                                                <span class="lead-text">+ 0.0526 <span class="currency currency-btc">BTC</span></span>
                                                <span class="text-success ml-2">3.1% <em class="icon ni ni-arrow-long-up"></em></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="user-account-label">
                                                <span class="sub-text">Deposit in orders</span>
                                            </div>
                                            <div class="user-account-value">
                                                <span class="sub-text text-base">0.005400 <span class="currency currency-btc">BTC</span></span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul class="user-account-links">
                                        <li><a href="#" class="link"><span>Withdraw Funds</span> <em class="icon ni ni-wallet-out"></em></a></li>
                                        <li><a href="#" class="link"><span>Deposit Funds</span> <em class="icon ni ni-wallet-in"></em></a></li>
                                    </ul>
                                    <ul class="link-list">
                                        <li><a href="html/crypto/profile.html"><em class="icon ni ni-user-alt"></em><span>View Profile</span></a></li>
                                        <li><a href="html/crypto/profile-security.html"><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                        <li><a href="html/crypto/profile-activity.html"><em class="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>
                                    </ul>
                                    <ul class="link-list">
                                        <li><a href="#"><em class="icon ni ni-signout"></em><span>Sign out</span></a></li>
                                    </ul>
                                </div>
                            </div><!-- .nk-sidebar-widget -->
                            <div class="nk-sidebar-menu">
                                <!-- Menu -->
                                <ul class="nk-menu">
                                   
                                    <li class="nk-menu-item">
                                        <a href="account/user_dashbaord.php" class="nk-menu-link">
                                            <span class="nk-menu-icon"><em class="icon ni ni-dashboard"></em></span>
                                            <span class="nk-menu-text">Home</span>
                                        </a>
                                    </li>
                                    <li class="nk-menu-item">
                                        <a href="account/user_plans.php" class="nk-menu-link">
                                            <span class="nk-menu-icon"><em class="icon ni ni-user-c"></em></span>
                                            <span class="nk-menu-text">Plans</span>
                                        </a>
                                    </li>
                                   
                                 
                                    <li class="nk-menu-item">
                                        <a href="account/history.php" class="nk-menu-link">
                                            <span class="nk-menu-icon"><em class="icon ni ni-repeat"></em></span>
                                            <span class="nk-menu-text">History</span>
                                        </a>
                                    </li>
                                   
                                    
                                    
                                    
                                </ul><!-- .nk-menu -->
                            </div><!-- .nk-sidebar-menu -->
                           
                        </div><!-- .nk-sidebar-content -->
                    </div><!-- .nk-sidebar-body -->
                </div><!-- .nk-sidebar-element -->
            </div>
            <!-- sidebar @e --> <div class="nk-wrap ">
                <!-- main header @s -->
                <div class="nk-header nk-header-fluid nk-header-fixed is-light">
                    <div class="container-fluid">
                        <div class="nk-header-wrap">
                            <div class="nk-menu-trigger d-xl-none ml-n1">
                                <a href="#" class="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em class="icon ni ni-menu"></em></a>
                            </div>
                            <div class="nk-header-brand d-xl-none">
                                <a href="html/crypto/index.html" class="logo-link">
                                    <img class="logo-light logo-img" src="./images/logo.png" srcset="./images/logo2x.png 2x" alt="logo">
                                    <img class="logo-dark logo-img" src="./images/logo-dark.png" srcset="./images/logo-dark2x.png 2x" alt="logo-dark">
                                    <span class="nio-version">Crypto</span>
                                </a>
                            </div>
                            
                            <div class="nk-header-tools">
                                <ul class="nk-quick-nav">
                                    <li class="dropdown user-dropdown">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                            <div class="user-toggle">
                                                <div class="user-avatar sm">
                                                    <em class="icon ni ni-user-alt"></em>
                                                </div>
                                                <div class="user-info d-none d-md-block">
                                                    <div class="user-status user-status-unverified">Unverified</div>
                                                    <div class="user-name dropdown-indicator">Abu Bin Ishityak</div>
                                                </div>
                                            </div>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                                            <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                                <div class="user-card">
                                                    <div class="user-avatar">
                                                        <span>AB</span>
                                                    </div>
                                                    <div class="user-info">
                                                        <span class="lead-text">Abu Bin Ishtiyak</span>
                                                        <span class="sub-text">info@softnio.com</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="dropdown-inner user-account-info">
                                                <h6 class="overline-title-alt">Nio Wallet Account</h6>
                                                <div class="user-balance">12.395769 <small class="currency currency-btc">BTC</small></div>
                                                <div class="user-balance-sub">Locked <span>0.344939 <span class="currency currency-btc">BTC</span></span></div>
                                                <a href="#" class="link"><span>Withdraw Funds</span> <em class="icon ni ni-wallet-out"></em></a>
                                            </div>
                                            <div class="dropdown-inner">
                                                <ul class="link-list">
                                                    <li><a href="html/crypto/profile.html"><em class="icon ni ni-user-alt"></em><span>View Profile</span></a></li>
                                                    <li><a href="html/crypto/profile-security.html"><em class="icon ni ni-setting-alt"></em><span>Account Setting</span></a></li>
                                                    <li><a href="html/crypto/profile-activity.html"><em class="icon ni ni-activity-alt"></em><span>Login Activity</span></a></li>
                                                </ul>
                                            </div>
                                            <div class="dropdown-inner">
                                                <ul class="link-list">
                                                    <li><a href="#"><em class="icon ni ni-signout"></em><span>Sign out</span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="dropdown notification-dropdown mr-n1">
                                        <a href="#" class="dropdown-toggle nk-quick-nav-icon" data-toggle="dropdown">
                                            <div class="icon-status icon-status-info"><em class="icon ni ni-bell"></em></div>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s1">
                                            <div class="dropdown-head">
                                                <span class="sub-title nk-dropdown-title">Notifications</span>
                                                <a href="#">Mark All as Read</a>
                                            </div>
                                            <div class="dropdown-body">
                                                <div class="nk-notification">
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div><!-- .dropdown-inner -->
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div><!-- .dropdown-inner -->
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div><!-- .dropdown-inner -->
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div><!-- .dropdown-inner -->
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div><!-- .dropdown-inner -->
                                                    <div class="nk-notification-item dropdown-inner">
                                                        <div class="nk-notification-icon">
                                                            <em class="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                        </div>
                                                        <div class="nk-notification-content">
                                                            <div class="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                                                            <div class="nk-notification-time">2 hrs ago</div>
                                                        </div>
                                                    </div><!-- .dropdown-inner -->
                                                </div>
                                            </div><!-- .nk-dropdown-body -->
                                            <div class="dropdown-foot center">
                                                <a href="#">View All</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- main header @e -->
                <!-- content @s -->
                <div class="nk-content nk-content-fluid">
                    <div class="container-xl wide-lg">
                        <div class="nk-content-body">
                            <div class="nk-block-head">
                               <!-- .nk-block-head-sub -->
                                <div class="nk-block-between-md g-4">
                                    
                                    
                                </div><!-- .nk-block-between -->
                            </div><!-- .nk-block-head -->
                          
                            <div class="nk-block nk-block-lg">
                                <div class="nk-block-head-sm">
                                    <div class="nk-block-head-content">
                                        <h5 class="nk-block-title title">Choose Package</h5>
                                    </div>
                                </div>
                                
                                    <div class="nk-block nk-block-lg">
                                      
                                        <div class="card card-preview">
                                            <div class="card-inner">
                                                <div class="row">
                                                   

                                                    <div class="col-lg-4">
                                                        <div class="card bg-light" style="background-color:white!important;  border-radius: 10px;border: 1px solid #c4cefe;margin-bottom: 10px; height: 250px;">
                                                            <div class="card-inner">

                                                                <h5 class="card-title">
                                                                    <img  src="./file/calender.png"  alt="image1"  height="70" width="70">
                                                                </h5>

                                                                <br><br>


                                                                <h5 class="card-title">RentWise Flex</h5>
                                                                <h6 class="card-subtitle mb-2 ff-base">
                                                                    <h1></h1>
                                                                </h6>


                                                           
                                                           <p> 
                                                            </p>
                                                                <p class="card-text">Regular Savings  8-12%</p>

                                                                <!-- Accepts flexible and fixed options
                                                            Interest is calculated based on amount in the account by 30th of the month
                                                            Customers can cash out ANYTIME -->
                                                                <!-- <a href="#" class="card-link">2</a>
                                                                <a href="#" class="card-link">3</a> -->
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4">
                                                        <div class="card bg-light" style="background-color:white!important;  border-radius: 10px;border: 1px solid #c4cefe; margin-bottom: 10px; height: 250px;">
                                                            <div class="card-inner">

                                                                <h5 class="card-title">
                                                                   <img  src="./file/calender.png"  alt="image2"  height="70" width="70">
                                                                </h5>

                                                                <br><br>

                                                                <h5 class="card-title">RentWise Pro</h5>
                                                                <h6 class="card-subtitle mb-2 ff-base">
                                                                    
                                                                </h6>
                                                                <p class="card-text">Fixed savings account with the options of getting interest ahead of maturity 12 - 15%</p>
                                                                <!-- <a href="#" class="card-link">2</a>
                                                                <a href="#" class="card-link">3</a> -->
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-4">
                                                        <div class="card bg-light" style="background-color:white!important;  border-radius: 10px;border: 1px solid #c4cefe; margin-bottom: 10px; height: 250px;">
                                                            <div class="card-inner">

                                                                <h5 class="card-title">
                                                                    <img  src="./file/calender.png"  alt="image3"  height="70" width="70">
                                                                </h5>
                                                                <br><br>

                                                                <h5 class="card-title">RentWise Pool</h5>
                                                                <h6 class="card-subtitle mb-2 ff-base">
                                                                    
                                                                </h6>

                                                           
                                                           <p> </p>
                                                                <p class="card-text">Initiate a savings target with friends and family 10%</p>
                                                                <!-- Members of the pool agree on amount & duration (minimum 6 months) -->
                                                                <!-- <a href="#" class="card-link">2</a>
                                                                <a href="#" class="card-link">3</a> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    

                                                    <div class="col-lg-4">
                                                        <div class="card bg-light" style="background-color: white!important; margin-bottom: 10px; border-radius: 10px;border: 1px solid #c4cefe; height: 250px;">
                                                            <div class="card-inner">

                                                                <h5 class="card-title">
                                                                   <img  src="./file/calender.png"  alt="image4"  height="70" width="70">
                                                                </h5>
                                                                <br><br>

                                                                <h5 class="card-title">RentWise Vest</h5>
                                                                <h6 class="card-subtitle mb-2 ff-base">
                                                                    
                                                                </h6>
                                                                <p class="card-text">0 - 30% Secured periodic investment pools with high yields</p>
                                                                <!-- <a href="#" class="card-link">2</a>
                                                                <a href="#" class="card-link">3</a> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                           

                                                    
                                                </div>
                                            </div>
                                        </div>

                                        
                                    </div>

                                    <div class="card__list">
                                        <div class="card__list__item active" style="background-color: #a3d4fb; width: 50%;">
                                            <div class="card__list__item__row">
                                                <div class="card__list__item__name" style = "text-align: right !important;" >
                                                </div> 
                                                <div class="card__list__item__icon" style = "margin-right: 5%  !important;" ><button class ="btn" style="background-color: #2f87ff; color: white; font-family:Times New Roman, Times, serif;  font-size: 12px;" >REGULAR PLAN</button></div>
                                            </div> 

                                            <div class="card__list__item__numbers"><div class="card__list__item__numbers__item"><h6>Nnn</h6></div> 


                                            <div class="card__list__item__numbers__item" style="margin-right: 2%"></div>

                                            <!--  <div class="card__list__item__numbers__item">8296</div> <div class="card__list__item__numbers__item">4444</div> -->
                                            </div>

                                            <div class="card__list__item__row">
                                                <div class="card__list__item__balance"> <h4>₦ 0.00</h4>      
                                                </div>
                                                <div class="vl"></div> 

                                                    <div class="card__list__item__valid">
                                                        <div class="card__list__item__valid__title"><h3>5%</h3></div>
                                                        <div class="card__list__item__valid__value" style="color:#808080">Interest p.a.</div> 
                                                        
                                                    </div>
                                            </div>

                                        </div>
                                    </div>



                                    
                                   
                                </div><!-- .row -->
                            </div><!-- .nk-block -->
                        </div>
                    </div>
                </div>
                <!-- content @e -->
             <div class="nk-footer nk-footer-fluid">
                    <div class="container-fluid">
                        <div class="nk-footer-wrap">
                            <div class="nk-footer-copyright"> &copy; 2020 DashLite. Template by <a href="#">Softnio</a>
                            </div>
                            <div class="nk-footer-links">
                                <ul class="nav nav-sm">
                                    <li class="nav-item"><a class="nav-link" href="#">Terms</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#">Privacy</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#">Help</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- footer @e -->
            </div>
            <!-- wrap @e -->
        </div>
        <!-- main @e -->
    </div>
    <!-- app-root @e -->
    <!-- JavaScript -->
    <script src="./assets/js/bundle.js?ver=1.8.0"></script>
    <script src="./assets/js/scripts.js?ver=1.8.0"></script>
    <script src="./assets/js/charts/chart-crypto.js?ver=1.8.0"></script>
</body>

</html>