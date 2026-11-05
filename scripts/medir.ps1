# Mede uma URL com Lighthouse (celular e desktop) e desconta o que o antivírus
# local injeta (domínios kaspersky-labs). Uso: .\scripts\medir.ps1 <nome> <url> <pasta>
param([string]$Nome, [string]$Url, [string]$Pasta)
New-Item -ItemType Directory -Force $Pasta | Out-Null
foreach ($s in 'mobile', 'desktop') {
  $arq = Join-Path $Pasta "$Nome-$s.json"
  $extra = if ($s -eq 'desktop') { '--preset=desktop' } else { '' }
  # Bloqueia os arquivos que o antivírus injeta: sem isso, o CSS dele trava a renderização.
  npx --yes lighthouse@12.8.2 $Url --quiet --chrome-flags="--headless=new" --blocked-url-patterns="*kaspersky-labs.com*" --output=json --output-path="$arq" --only-categories=performance,accessibility,best-practices,seo $extra 2>$null | Out-Null
  $r = Get-Content $arq -Raw -Encoding utf8 | ConvertFrom-Json
  $a = $r.audits; $c = $r.categories
  $itens = $a.'network-requests'.details.items | Where-Object { $_.url -notmatch 'kaspersky' }
  $js = $itens | Where-Object { $_.resourceType -eq 'Script' }
  $kb = { param($x) [math]::Round((($x | Measure-Object transferSize -Sum).Sum) / 1024) }
  [pscustomobject]@{
    site = $Nome; tela = $s
    desempenho = [math]::Round($c.performance.score * 100)
    acessib = [math]::Round($c.accessibility.score * 100)
    praticas = [math]::Round($c.'best-practices'.score * 100)
    seo = [math]::Round($c.seo.score * 100)
    FCP = $a.'first-contentful-paint'.displayValue -replace '\s', ' '
    LCP = $a.'largest-contentful-paint'.displayValue -replace '\s', ' '
    TBT = $a.'total-blocking-time'.displayValue -replace '\s', ' '
    CLS = $a.'cumulative-layout-shift'.displayValue
    jsKB = & $kb $js
    totalKB = & $kb $itens
  }
}
