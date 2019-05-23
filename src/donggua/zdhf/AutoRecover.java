/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package donggua.zdhf;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author apple
 */
public class AutoRecover {
    
    /**最高血量和蓝量*/
    private static final int MAXHP = 100000;
    private static final int MAXMP = 100000;
    
    /**玩家ID列表*/
    private  Map<Integer,MemberInfo> members = new HashMap<Integer, MemberInfo>();

    /**
     * 内部初始化
     */
    private AutoRecover(){
        
    };
    
    /**获得实例*/
    public static AutoRecover getInstance(){
        return AutoRevoerInstanceClass.instance;
    }

    /**
     * @return the members
     */
    public Map<Integer,MemberInfo> getMembers() {
        return members;
    }
    
    
    public static class AutoRevoerInstanceClass{
       
        public static final AutoRecover instance = new AutoRecover();
    }
    
    
    /**
     * 添加玩家到集合
     * @param id 
     */
    public  void addPlayer(Integer id,MemberInfo memberInfo){
        getMembers().put(id, memberInfo);
    }
    
    /**
     * 移除玩家
     * @param id 
     */
    public  void removePlayer(Integer id){
        getMembers().remove(id);
    }
    
    
    /**
     * 看玩家有没有资格
     * @param id
     * @return 
     */
    public  boolean getQualification(int id){
        if(!members.isEmpty()){
            return getMembers().containsKey(id);
        }
        return false;
    }
    
    
    /**
     * 恢复血
     */
    public int recocerPlayerHp(int id,int quantity){
       MemberInfo info = getMember(id);
       
       if(info.getStoreHp() < 1){
           System.out.println("存储不足");
           return 0;
       }
       if(info.getStoreHp() < quantity){
           info.setStoreHp(0);
           return info.getStoreHp();
       }else{
           info.setStoreHp(info.getStoreHp() - quantity);
           return quantity;
       }
    }
    /**
     * 恢复蓝
     */
    public int recoverPlayerMp(int id,int quantity){
          MemberInfo info = getMember(id);
       
       if(info.getStoreMp() < 1){
           System.out.println("存储不足");
           return 0;
       }
       if(info.getStoreMp() < quantity){
           info.setStoreMp(0);
           return info.getStoreMp();
       }else{
           info.setStoreMp(info.getStoreMp() - quantity);
           return quantity;
       }
    }
    
    /**
     * 获得玩家存储信息
     * @return 
     */
    public MemberInfo getMember(int id){
        MemberInfo member = getMembers().get(id);
        return member;
    }
    
    
}
