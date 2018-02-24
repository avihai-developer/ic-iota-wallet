package cordova.plugin.iota;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.google.gson.Gson;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import jota.IotaAPI;
import jota.dto.response.GetAccountDataResponse;
import jota.dto.response.GetNewAddressResponse;
import jota.dto.response.GetNodeInfoResponse;
import jota.error.ArgumentException;

/**
 * This class echoes a string called from JavaScript.
 */
public class iota extends CordovaPlugin {

    private Activity myActivity;
    private IotaAPI api;
    private String seed;

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        if (action.equals("init")) {
            Log.d("iotaNative", " init");
            myActivity = this.cordova.getActivity();
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    api = new IotaAPI.Builder()
                            .protocol("https")
                            .host("node.iota-community.org")
                            .port("")
                            .build();
                }
            });
            callbackContext.success("iota init");
            return true;
        }
        if (action.equals("getNewAddress")) {
            seed = data.getString(0);
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    api = new IotaAPI.Builder()
                            .protocol("https")
                            .host("node.iota-community.org")
                            .port("")
                            .build();
                    GetNewAddressResponse response = null;
                    try {
                        response = api.getNewAddress(
                                seed,
                                2,
                                0,
                                false,
                                0,
                                true
                        );
                        Gson gson = new Gson();
                        callbackContext.sendPluginResult(setAndroidPreferences(gson.toJson(response)));
                    } catch (ArgumentException e) {
                        e.printStackTrace();
                    }
                }
            });
            return true;
        }
        if (action.equals("getAccountData")) {
            seed = data.getString(0);
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    api = new IotaAPI.Builder()
                            .protocol("https")
                            .host("node.iota-community.org")
                            .port("")
                            .build();
                    GetAccountDataResponse response = null;
                    try {
                        response = api.getAccountData(
                                seed,
                                2,
                                0,
                                true,
                                0,
                                true,
                                0,
                                0,
                                true,
                                0
                        );
                        Gson gson = new Gson();
                        callbackContext.sendPluginResult(setAndroidPreferences(gson.toJson(response)));
                    } catch (ArgumentException e) {
                        e.printStackTrace();
                    }
                }
            });
            return true;
        }
        return false;
    }

    private PluginResult setAndroidPreferences(String response) {
        return new PluginResult(PluginResult.Status.OK, response);
    }


}