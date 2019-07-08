// All functions and events regarding the visibility and navigation

// Visibility state on the main menu
function initializeVisibility() {
    $("#accounts").html("");
    $("#claim").hide();
    $("#add_account_div").hide();
    $(".error_div").hide();
    $(".success_div").hide();
    $("#master_check").hide();
    $("#autolock_div").hide();
    $("#powerup_div").hide();
    $("#powerdown_div").hide();
    $("#token_history_div").hide();
    $("#confirm_send_div").hide();
    $("#username").val("");
    $("#outgoing_del_div").hide();
    $("#incoming_del_div").hide();
    $("#pwd").val("");
    $("#acc_transfers").hide();
    $(".error_div").html("");
    $("#posting_key").prop("checked", true);
    $("#active_key").prop("checked", true);
    $("#memo_key").prop("checked", true);
    $(".account_info").hide();
    $(".account_info_content").hide();
    $(".account_info_menu").removeClass("rotate180");
    $("#transfer_to").hide();
    $("#add_key_div").hide();
    $("#estimation_info").hide();
    $("#pref_div").hide();
    $("#tokens_div").hide();
    $("#tokens_settings_div").hide();
    $("#delegation_div").hide();
    $("#add_rpc_div").hide();
    $("#edit_del_div").hide();
    $("#new_key").val("");
    $("#keys_info").empty();
    $("#balance_steem").html("");
    $("#balance_sbd").html("");
    $("#witness_div").hide();
    $("#balance_sp").html("");
    $(".checkbox_memo").hide();
    $("#encrypt_memo").prop("checked", false);
    $("#register").hide();
    $("#unlock").hide();
    $("#send_div").hide();
    $("#settings_div").hide();
    $("#add_account_div .back_enabled").removeClass("back_disabled");
    $(".wallet_currency").removeClass('dropdown-open');
    $(".dropdown").hide();
}

// Use "Enter" as confirmation button for unlocking, registration, and adding account/key
$('#unlock_pwd').keypress(function(e) {
    if (e.keyCode == 13)
        $('#submit_unlock').click();
});

$('#confirm_master_pwd').keypress(function(e) {
    if (e.keyCode == 13)
        $('#submit_master_pwd').click();
});

$('#pwd').keypress(function(e) {
    if (e.keyCode == 13)
        $('#check_add_account').click();
});

$('#new_key').keypress(function(e) {
    if (e.keyCode == 13)
        $('#add_new_key').click();
});

// Clicking back after "forgot password"
$("#back_forgot").click(function() {
    $("#forgot_div").hide();
    if ($(this).attr("id") == "back_forgot_settings")
        $("#settings_div").show();
    else
        $("#unlock").show();
});

// Clicking back after "add key"
$("#add_key_div .back_enabled").click(function() {
    $("#add_key_div").hide();
    $("#manage_keys").show();
    $(".error_div").hide();
});

$("#add_rpc_div .back_enabled").click(function() {
    chrome.storage.local.get(["rpc", "current_rpc"], function(items) {
        loadRPC(items.rpc, items.current_rpc);
        initiateCustomSelect();
        $("#add_rpc_div").hide();
        $("#pref_div").show();
    });
});

// Clicking back from the preferences menu
$(".back_pref").click(function() {
    $(".settings_child").hide();
    $("#settings_div").show();
    manageKey = false;
    getPref = false;
});

// Show forgot password
$("#forgot").click(function() {
    $("#forgot_div").show();
    $("#unlock").hide();
});

// Show settings
$("#settings").click(function() {
    $("#settings_div").show();
    $("#main").hide();
});

// Show about
$("#about").click(function() {
    $("#about_div").show();
    $("#about_div h3").html(chrome.runtime.getManifest().name + chrome.runtime.getManifest().version);
    $("#settings_div").hide();
});

// Open the mange keys info
$("#manage").click(function() {
    manageKey = true;
    $("#manage_keys").show();
    $("#settings_div").hide();
    manageKeys($(".usernames .select-selected").eq(1).html());
});

// Go back
$(".back_menu").click(function() {
    initializeMainMenu();
});

// Click on the change password option of the settings
$("#change_pwd").click(function() {
    $("#settings_div").hide();
    $("#change_password").show();
});

// Navigate to preferences
$("#preferences").click(async function() {
    $("#pref_div").show();
    $("#settings_div").hide();
    getPref = true;
    setPreferences($(".select-selected").eq(3).html());
});

// After checking master key, go back to Add Account Page
$(".back_add_key").click(function() {
    $("#master_check").hide();
    $("#add_account_div").show();
});

// Go to clear wallet page
$("#clear").click(function() {
    $("#settings_div").hide();
    $("#forgot_div").show();
    $("#back_forgot").attr("id", "back_forgot_settings");
});

// Show add a new key
$('#add_key').click(function() {
    $('#add_key_div').show();
});

// extra info on the estimated account value
$("#account_value_header").click(function() {
    $('#main').hide();
    $("#estimation_info").show();
});

// Navigate to autolock menu
$("#autolock").click(function() {
    $('#settings_div').hide();
    $("#autolock_div").show();
});

// Nativate to keychainify_settings menu
$("#keychainify").click(function() {
    $('#settings_div').hide();
    $("#keychainify_settings").show();
});

// Show transaction window
$("#send").click(function() {
    $("#send_div").show();
    if (active_account.keys.hasOwnProperty("memo")) {
        $(".checkbox_memo").show();
    }
    $("#main").hide();
});

// Show transaction history window
$("#history").click(function() {
    $("#acc_transfers").show();
    $("#main").hide();
});

$("#tokens").click(function() {
    $("#tokens_div").show();
    $("#main").hide();
});

// Toggle witness votes div
$("#witness_toggle").click(function() {
    $("#witness_votes").animate({
        bottom: ($("#witness_votes").css('bottom') == '0px') ? -72 : 0
    }, 500);
});

$("#witness").click(function() {
    $("#main").hide();
    $("#witness_div").show();
    $("#voted").addClass("active_wit");
});

$(".wit-menu").click(function() {
    $("#witness_div button").removeClass("active_wit");
    $(this).addClass("active_wit");
    $(".sub_wit").hide();
    $("#" + $(this).attr("id") + "_div").show();
});

// Show / hide password
$(".input_img_right_eye").click(function() {
    if ($("#unlock_pwd").prop("type") == "password") {
        $("#unlock_pwd").prop("type", "text");
        $(".input_img_right_eye").prop("src", "../images/eye.png");
        $(".input_img_right_eye").height("20.72px");
    } else {
        $("#unlock_pwd").prop("type", "password");
        $(".input_img_right_eye").prop("src", "../images/hide.png");
        $(".input_img_right_eye").height("29.93px");
    }
});

$("#add_new_rpc").click(function() {
    addNewRPC($("#new_rpc").val());
});

// Handle pages visibility

function showRegister() {
    $("#main").hide();
    $("#register").show();
}

function showUnlock() {
    $("#main").hide();
    $("#unlock").show();
    $("#unlock_pwd").focus();
}

function showLoader() {
    $("#send_loader").show();
    $("#confirm_send_transfer").hide();
}

function showAccountInfo(account, that) {
    if (account.keys.hasOwnProperty("active"))
        $("#transfer_to").show();
    $(".account_info").attr("id", "a" + $(that).index());
    $("#account_info_name").html("@" + account.name);
    $("#main").hide();
    $(".account_info").show();
}

$("#add_new_account").click(function() {
    showAddAccount();
});

function showAddAccount() {
    $("#add_account_div").css("display", "block");
    $("#main").css("display", "none");
    $("#settings_div").css("display", "none");
}

$(".wallet_currency").click(function() {
    $(".wallet_currency").not(this).removeClass('dropdown-open');
    $(".dropdown").not($(this).next()).hide();
    $(this).toggleClass('dropdown-open');
    $(this).next().toggle();
});

$("#powerup").click(function() {
    $("#powerup_div").show();
    $("#main").hide();
    $(".wallet_currency").removeClass('dropdown-open');
    $(".dropdown").hide();
});

$("#powerdown").click(function() {
    $("#powerdown_div").show();
    $("#main").hide();
    $(".wallet_currency").removeClass('dropdown-open');
    $(".dropdown").hide();
});

$("#send_steem").click(function() {
    $("#send_div").show();
    $("#main").hide();
    $(".wallet_currency").removeClass('dropdown-open');
    $(".dropdown").hide();
    $("#currency_send .select-selected").html("STEEM");
    $(".transfer_balance div").eq(0).text('STEEM Balance');
    $(".transfer_balance div").eq(1).html(numberWithCommas(steem_p));
});

$("#send_sbd").click(function() {
    $("#send_div").show();
    $("#main").hide();
    $(".wallet_currency").removeClass('dropdown-open');
    $(".dropdown").hide();
    $("#currency_send .select-selected").html("SBD");
    $(".transfer_balance div").eq(0).text('SBD Balance');
    $(".transfer_balance div").eq(1).html(numberWithCommas(sbd));
});

$("#delegate").click(function() {
    $("#main").hide();
    $("#delegation_div").show();
    $(".wallet_currency").removeClass('dropdown-open');
    $(".dropdown").hide();
});

$("#outgoing_del").click(function() {
    $("#outgoing_del_div").show();
    $("#delegation_div").hide();
});

$("#outgoing_del_div .back_enabled").click(function() {
    $("#outgoing_del_div").hide();
    $("#delegation_div").show();
});

$("#incoming_del").click(function() {
    $("#incoming_del_div").show();
    $("#delegation_div").hide();
});

$("#incoming_del_div .back_enabled").click(function() {
    $("#incoming_del_div").hide();
    $("#delegation_div").show();
});

$("#edit_del_div .back_enabled").click(function() {
    $("#edit_del_div").hide();
    $("#outgoing_del_div").show();
});

$("#settings_tokens").click(function() {
    $("#tokens_div").hide();
    $("#tokens_settings_div").show();
});

$("#tokens_settings_div .back_enabled").click(function() {
    $("#tokens_div").show();
    $("#tokens_settings_div").hide();
});

$("#token_send_div .back_enabled").click(function() {
    $("#token_send_div").hide();
    $("#tokens_div").show();
});

$("#token_history_div .back_enabled").click(function() {
    $("#token_history_div").hide();
    $("#tokens_div").show();
});

$("#confirm_send_div .back_enabled").click(function() {
    $("#confirm_send_div").hide();
    $("#send_div").show();
});
