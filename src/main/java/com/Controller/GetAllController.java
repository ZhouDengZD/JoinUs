package com.Controller;

import com.Model.UserInfo;
import com.Service.SourceCodeService;
import com.Service.UserService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: zhangocean
 * @Date: Created in 22:01 2017/12/19
 * Describe: 查询信息- 控制层
 */
@Controller
public class GetAllController {

    @Autowired
    UserService userService;

    @Autowired
    SourceCodeService sourceCodeService;

    @RequestMapping("/getAllInfo")
    @ResponseBody
    //使用Ajax.js版-Post方法
    public JSONArray getAll(@RequestBody String all, HttpServletRequest request){
        System.out.println(all);
        JSONObject j = JSONObject.fromObject(all);

        int rows = (int) j.get("rows");
        int pageNo = (int) j.get("pageNo");
        Page<UserInfo> sourceCodes = this.sourceCodeService.getSourceCode(pageNo, rows);

        //将每一页的内容转换成Json数组
        JSONArray jsonArray = JSONArray.fromObject(sourceCodes.getContent().toArray());

        Map<String, Object> map = new HashMap<>();
        //查询记录的总数以及共多少页
        List<UserInfo> userInfoList = userService.findAllUsers();
        map.put("totalSize",userInfoList.size());
        map.put("totalPage",Math.ceil((double)userInfoList.size()/10));
        jsonArray.add(map);

        System.out.println(jsonArray.toString());
        return jsonArray;
    }
    //使用Ajax.js版-get方法
    //  public JSONArray getAll(@RequestParam(value = "rows") String rows1, @RequestParam(value = "pageNo") String pageNo1){

    //     int rows = Integer.parseInt(rows1);
    //     int pageNo = Integer.parseInt(pageNo1);

    //     Page<UserInfo> sourceCodes = this.sourceCodeService.getSourceCode(pageNo, rows);

    //     //将每一页的内容转换成Json数组
    //     JSONArray jsonArray = JSONArray.fromObject(sourceCodes.getContent().toArray());

    //     Map<String, Object> map = new HashMap<>();
    //     //查询记录的总数以及共多少页
    //     List<UserInfo> userInfoList = userService.findAllUsers();
    //     map.put("totalSize",userInfoList.size());
    //     map.put("totalPage",Math.ceil((double)userInfoList.size()/rows));
    //     //改动
    //     jsonArray.add(map);

    //     System.out.println(jsonArray.toString());
    //     return jsonArray;
    // }
    
    //最初版：使用jquery的ajax库版
    // public JSONArray getAll(HttpServletRequest request){

    //     int rows = Integer.parseInt(request.getParameter("rows"));
    //     int pageNo = Integer.parseInt(request.getParameter("pageNo"));


    //     Page<UserInfo> sourceCodes = this.sourceCodeService.getSourceCode(pageNo, rows);

    //     List<UserInfo> userInfoList = userService.findAllUsers();
    //     JSONArray jsonArray = JSONArray.fromObject(sourceCodes.getContent().toArray());
    //     Map<String, Object> map = new HashMap<>();

    //     //查询记录的总数以及共多少页
    //     map.put("totalSize",userInfoList.size());
    //     map.put("totalPage",Math.ceil((double)userInfoList.size()/10));
    //     jsonArray.add(map);
    //     System.out.println(jsonArray);

    //     return jsonArray;
    // }

}
