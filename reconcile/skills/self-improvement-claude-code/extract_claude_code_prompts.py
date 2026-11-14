"""Extract user prompts from Claude Code transcripts.
Run from ~/.claude/projects/<project>: python extract_claude_code_prompts.py [out.txt]
Output can contain PHI. Keep it local; never commit it."""
import json,glob,os,sys,datetime
out=[]
for f in glob.glob('*.jsonl')+glob.glob('../C--Users-nav-*/*.jsonl'):
    sid=os.path.basename(f)[:8]
    for line in open(f,encoding='utf-8',errors='ignore'):
        try:d=json.loads(line)
        except: continue
        if d.get('type')!='user': continue
        m=d.get('message',{})
        c=m.get('content')
        if isinstance(c,list):
            c=' '.join(x.get('text','') for x in c if isinstance(x,dict) and x.get('type')=='text')
        if not isinstance(c,str) or not c.strip(): continue
        if c.startswith('<') or 'system-reminder' in c[:40] or 'tool_result' in c[:30]: continue
        out.append((d.get('timestamp',''),sid,c.strip().replace('\n',' ')[:400]))
out.sort()
open(sys.argv[1] if len(sys.argv)>1 else 'prompts.txt','w',encoding='utf-8').write('\n'.join(f"{t[:10]} {s} {c}" for t,s,c in out))
print(len(out))
