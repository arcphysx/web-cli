import sha1 from 'crypto-js/sha1';
import { cliConfig } from '../constant/cli_config';

var _session_counter = 0;

export class CommandProcessor {
    constructor(prefix = "!") {
        this.prefix = prefix;
        this.digested = {
            "is_command": false,
            "raw": "",
            "parameters": []
        };
    }

    replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    digest(text){
        this.digested.raw = text;

        // If input text length is less than prefix length + 1
        // then command is invalid
        if(text.length < this.prefix.length+1){
            return this.digested;
        }
        
        if(text.substr(0, this.prefix.length) != this.prefix){
            return this.digested;
        }

        var sanitized = text.substr(this.prefix.length, text.length);
        
        var quoted = sanitized.match(/".*?"/);
        if(quoted != null && quoted.length > 0){
            for (let i = 0; i < quoted.length; i++) {
                var t = this.replaceAll(quoted[i], '"', '');
                var n = this.replaceAll(t,' ', ';;_-_;;');
                sanitized = this.replaceAll(sanitized, quoted[i], n);
            }
        }

        var explodeSpace = sanitized.split(' ');

        for (let i = 0; i < explodeSpace.length; i++) {
            explodeSpace[i] = this.replaceAll(explodeSpace[i], ';;_-_;;', ' ');
        }

        var parse = {
            "command": explodeSpace[0],
            "param": []
        }

        explodeSpace.splice(0,1);

        var dashedIdx = [];
        for (let i = 0; i < explodeSpace.length; i++) {
            let v = explodeSpace[i];
            let m = v.match(/^-[a-zA-Z0-9-]+$/);
            if(m != null && m.length > 0){
                dashedIdx.push(i);
            }
        }

        for (let i = 0; i < explodeSpace.length; i++) {
            let v = explodeSpace[i];
            if(v.match(/^-[a-zA-Z0-9-]+$/) == null){
                parse.param.push({
                    "-": v
                });
            }else{
                let p = {};
                if(Math.max(...dashedIdx) > i || Math.max(...dashedIdx)+1 <= explodeSpace.length-1){
                    if(explodeSpace[i+1].match(/^-[a-zA-Z0-9-]+$/) == null){
                        p[this.replaceAll(v, '-', '')] = explodeSpace[i+1];
                        parse.param.push(p);
                        i++;
                    }else{
                        p[this.replaceAll(v, '-', '')] = null;
                        parse.param.push(p);
                    }
                }else{
                    p[this.replaceAll(v, '-', '')] = null;
                    parse.param.push(p);
                }
            }
        }

        this.digested.parameters = parse;
        this.digested.is_command = true;
        return this.digested;
    }
}

export class History {
    static create(output, session){
        if(typeof output != 'undefined'){
            session.history.push(new History(output, session))
        }
    }

    constructor(output, session) {
        this.output = output;
        this.createdAt = Math.round((new Date()).getTime() / 1000);
        this.state = Object.assign({}, session.state);
    }
}

export class Session {
    constructor(name = `Terminal ${++_session_counter}`, username="guest", host = "localhost", pwd = "~", scope = "$") {
        this.id = sha1(`terminal_${Math.round((new Date()).getTime() / 1000)}`);
        this.name = name;
        this.history = [];
        this.state = {
            "username": username,
            "host" : host,
            "pwd" : pwd,
            "scope" : scope,
            "typed" : "",
        };
        this.history.push(new History(cliConfig.INTRO, {}))
    }
}
