import { CommandProcessor } from './terminal'
var _session = null;
function processor (session){
    _session = session
    if(_session.state.typed == "") return ""
    var cmd = new CommandProcessor("")
    return commandLookup(cmd.digest(_session.state.typed))
}

function commandLookup(digested){
    if(digested.parameters.command == "whoami"){
        return _session.state.username
    }else if(digested.parameters.command == "clear"){
        _session.history = []
        return 
    }else if(digested.parameters.command == "sudo"){
        return `${digested.parameters.command}: Permission denied`
    }else if(digested.parameters.command == "go"){
        if(digested.parameters.param.length <= 0) return `${digested.parameters.command}: need destination url`
        setTimeout(() => { window.open(`http://${digested.parameters.param[0]['-']}`, "_blank") }, 2000)
        return `Redirecting to ${digested.parameters.param[0]['-']}...`
    }else if(digested.parameters.command == "help"){
        return `
            <strong>whoami</strong> - print effective userid<br/>
            <strong>clear</strong> - clear the terminal screen<br/>
            <strong>sudo</strong> - execute a command as another user<br/>
            <strong>go</strong> - go to a website<br/>
            <strong>help</strong> - print available command
        `
    }

    return `${digested.parameters.command}: command not found.`
}

export { processor }