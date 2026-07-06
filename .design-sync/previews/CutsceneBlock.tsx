import { CutsceneBlock } from "@pacsarcade/arcade-ui";

const wrap: React.CSSProperties = { padding: 24, maxWidth: 560 };

export function CampaignUpdate() {
  return (
    <div className="pa-screen" style={wrap}>
      <CutsceneBlock tag="UPDATE 03" title="LEVEL 2 UNLOCKED" date="2026-07-14">
        <p>
          We hit 50% this weekend, frens. The neon sign vendor is booked and the first batch of Gold
          Cartridge ordinals goes to inscription on Monday.
        </p>
        <p>
          Every sat so far is visible on the campaign wallet — check the trust row up top if you want to
          verify it yourself. That&apos;s the whole point.
        </p>
      </CutsceneBlock>
    </div>
  );
}

export function PatchNotes() {
  return (
    <div className="pa-screen" style={wrap}>
      <CutsceneBlock tag="UPDATE 04" title="PATCH NOTES v0.5" date="2026-07-21">
        <p>+ The Arcade Rune etches to backer wallets Friday</p>
        <p>+ 12 new backers joined the high-score board</p>
        <p>+ Fixed: pending sats now show on the energy bar within one block</p>
      </CutsceneBlock>
    </div>
  );
}
